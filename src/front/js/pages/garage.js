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

    async function getMotos() {
        setMotoInfo(await actions.getMotos())

    }

    useEffect(() => {
        getMotos()
    }, []);

    let tareas = ""
    let estado = ""
    if (motoInfo[motoCount]) {
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

    return (<div id="wrapper-total">
        <div id="flechaI"><img src={flecha} onClick={() => { if (motoCount > 0) { setMotoCount(motoCount - 1) } }} /></div>
        <div id="wrapper-card">
            <div className="card">
                <div class="card-body">
                    <h5 class="card-title">Motocicletas</h5>
                    <ul class="card-text">
                        <li>Modelo: {motoInfo[motoCount] ? motoInfo[motoCount].model : " -"}</li>
                        <li>Marca: {motoInfo[motoCount] ? motoInfo[motoCount].brand : " -"}</li>
                        <li>Año: {motoInfo[motoCount] ? motoInfo[motoCount].year : " -"}</li>
                        <li>Kilómetros: {motoInfo[motoCount] ? motoInfo[motoCount].mileage : " -"}</li>
                        {motoInfo[motoCount] ? tareas : " -"}
                    </ul>
                    <button onClick={handleStatus}>{motoInfo[motoCount] ? estado : " -"}</button>
                    <button onClick={handleDelete}>Borrar</button>
                    <button>API Externa</button>
                </div>
            </div>
        </div>
        <div id="flechaD"><img src={flecha} onClick={() => { if (motoCount < motoInfo.length - 1) { setMotoCount(motoCount + 1) } }} /></div>
    </div>)
}
