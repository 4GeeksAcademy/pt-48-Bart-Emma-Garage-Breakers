import React, { useContext, useState, useEffect } from "react";
import flecha from "../../img/flecha.png";
import "../../styles/garage.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Garage = () => {
    const { actions } = useContext(Context);
    const [motoCount, setMotoCount] = useState(0)
    const [motoInfo, setMotoInfo] = useState([])
    const [count, setCount] = useState(0)
    const [info, setInfo] = useState("")
    const [clienteInfo, setClienteInfo] = useState([])
    const [propietario, setPropietario] = useState("")
    async function getMotos() {
        setMotoInfo(await actions.getMotos())
    }

    async function getClientes() {
        setClienteInfo(await actions.getClientes())
    }

    function clientName() {
        clienteInfo.forEach(e => {
            if (e.id == motoInfo[motoCount].clientID) {
                if (propietario != e.name) {
                    setPropietario(e.name)
                }

            }
        });
    }

    function initClient() {
        // 2. Initialize the JavaScript client library.
        window.gapi.client
            .init({
                apiKey: "AIzaSyB3cgot9HcPyBEzmu8g6DvtQS9TuR_n4bg",
            })
    };

    async function importInfo() {
        try {
            window.gapi.client.load("sheets", "v4");
            const response = await window.gapi.client.sheets.spreadsheets.values
                .get({
                    spreadsheetId: "17JJSc8vXHsQ8-T9d6drNY-IYrC7FnoxPpaEMbV1Lfqk",
                    range: "Hoja 1!A:A"
                });
            const data = response.result.values;
            return data;
        } catch (error) {
            console.error("Error loading", error)
            return null;
        }
    }

    async function handleImport() {
        const data = await importInfo()
        setInfo(await data)
        console.log("FETCH", data)
        if (data.length > 3) {
            handleReceptionForm()
        }
    }

    useEffect(() => {
        getMotos()
        getClientes()
        window.gapi.load("client", initClient)
    }, []);


    let tareas = ""
    let estado = ""
    if (motoInfo[motoCount]) {
        clientName()
        tareas = Object.keys(motoInfo[motoCount].tasks)
        tareas = tareas.map((t) => (
            <li>{t}</li>
        ))
        if (motoInfo[motoCount].status == false) {
            estado = "En proceso"
        }
        else {
            estado = "Finalizado"
        }
    }
    const handleStatus = async (e) => {
        await actions.changeState(motoInfo[motoCount].id)
        getMotos()
    }
    const handleDelete = async (e) => {
        await actions.deleteMoto(motoInfo[motoCount].id)
        getMotos()
    }

    const handleReceptionForm = async () => {
        let tasks = ""

        info.forEach(async e => {
            let data = JSON.parse(e)
            const clienteBody = {
                "name": data.name,
                "surname": data.surname,
                "email": data.email,
                "phone": data.phone,
            }
            console.log(clienteBody, "caca")
            await handleMotorbikeForm(await actions.addCliente(clienteBody), data)
        });
    }
    const handleMotorbikeForm = async (clienteID, data) => {

        const addMoto = await actions.addMoto(data.brand,
            data.model,
            data.year,
            data.mileage,
            data.tasks,
            clienteID);
        console.log(data.model, data.year, data.mileage, data.tasks, clienteID, "DATA")
        getMotos()
    };

    return (<div id="wrapper-total">
        <div id="flechaI"><img src={flecha} onClick={() => { if (motoCount > 0) { setMotoCount(motoCount - 1) } }} /></div>
        <div id="wrapper-card">
            <div className="card">
                <div class="card-body">
                    <h5>Propietario</h5> {propietario}
                    <hr />
                    <h5 class="card-title">Motocicleta</h5>
                    <ul class="card-text">
                        <li>Marca: {motoInfo[motoCount] ? motoInfo[motoCount].brand : " -"}</li>
                        <li>Modelo: {motoInfo[motoCount] ? motoInfo[motoCount].model : " -"}</li>
                        <li>Año: {motoInfo[motoCount] ? motoInfo[motoCount].year : " -"}</li>
                        <li>Kilómetros: {motoInfo[motoCount] ? motoInfo[motoCount].mileage : " -"}</li>
                        <hr />
                        <h5>Tareas</h5>
                        {motoInfo[motoCount] ? tareas : " -"}
                    </ul>

                    <button onClick={handleStatus}>{motoInfo[motoCount] ? estado : " -"}</button>
                    <button onClick={handleDelete}>Borrar</button>
                    <button onClick={handleImport}>Importar registros</button>

                </div>
            </div>
        </div>
        <div id="flechaD"><img src={flecha} onClick={() => { if (motoCount < motoInfo.length - 1) { setMotoCount(motoCount + 1) } }} /></div>

    </div>)
}
