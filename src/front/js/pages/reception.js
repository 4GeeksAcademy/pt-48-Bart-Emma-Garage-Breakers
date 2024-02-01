import React, { useContext, useState } from "react";
import logoform from "../../img/logoform.png";
import "../../styles/reception.css";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Modal, Button } from 'react-bootstrap';

export const Reception = () => {
    const { actions } = useContext(Context);
    const [protect, setProtect] = useState();
    const [nametask, setNameTask] = useState(' ');
    const [task, setTask] = useState([]);
    const [cliente, setCliente] = useState();
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleReceptionForm = async (e) => {
        e.preventDefault();

        let tasks = task.map(t => [t.nametask, 0])
        tasks = Object.fromEntries(tasks)



        const clienteBody = {
            "name": document.getElementById("nombre").value,
            "surname": document.getElementById("apellidos").value,
            "email": document.getElementById("email").value,
            "phone": document.getElementById("telefono").value
        }
        await handleMotorbikeForm(await actions.addCliente(clienteBody), tasks);
    }
    const handleMotorbikeForm = async (clienteID, tasks) => {

        const addMoto = await actions.addMoto(document.getElementById("marca").value,
            document.getElementById("modelo").value,
            document.getElementById("año").value,
            document.getElementById("kilometros").value,
            tasks,
            clienteID);

        document.getElementById("nombre").value = ""
        document.getElementById("apellidos").value = ""
        document.getElementById("email").value = ""
        document.getElementById("telefono").value = ""
        document.getElementById("marca").value = ""
        document.getElementById("modelo").value = ""
        document.getElementById("año").value = ""
        document.getElementById("kilometros").value = ""
        document.getElementById("inputTareas").value = ""
        setTask([])
        if (addMoto == "New motorbike added") {
            setShowModal(true)
        }


    };
    const [taskId, setTaskID] = useState(0);
    async function isPrivate() {
        try {
            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            const data = await fetch(
                process.env.BACKEND_URL + "api/protected",
                requestOptions
            );
            setProtect(data.status);
            let response = await data.json();
        } catch (error) {
            let details = { Error: error };
            console.log("Error en fetch private", details);
        }
    }

    if (protect != undefined && protect != 200) {
        return <Navigate to="/" />;
    }


    isPrivate();
    return (<>
        <div className="reception-wrapper">
            <img className="background-reception" src={logoform} />

            <h1 className="titulo-formulario"><u>Formulario de Contacto</u></h1>

            <div className="contenedor-datos-recepcion">
                <section className="contenedor-cliente">
                    <h3><u>Datos del Cliente</u></h3>
                    <form action="#" method="post">
                        <li>
                            <label for="nombre">Nombre: </label>
                            <input type="text" id="nombre" name="nombre" required />
                        </li>
                        <li>
                            <label for="apellidos">Apellidos: </label>
                            <input type="text" id="apellidos" name="apellidos" required />
                        </li>
                        <li>
                            <label for="telefono">Teléfono: </label>
                            <input type="tel" id="telefono" name="telefono" pattern="[0-9]{10}" placeholder="Ej. 1234567890"
                                required />
                        </li>
                        <li>
                            <label for="email">E-mail: </label>
                            <input type="email" id="email" name="email" placeholder="opcional" />
                        </li>
                    </form>
                </section>

                <section className="contenedor-motocicleta">
                    <h3><u>Datos de la Motocicleta</u></h3>
                    <form action="#" method="post">
                        <li>
                            <label for="marca">Marca: </label>
                            <input type="text" id="marca" name="marca" required />
                        </li>
                        <li>
                            <label for="modelo">Modelo: </label>
                            <input type="text" id="modelo" name="modelo" required />
                        </li>
                        <li>
                            <label for="año">Año: </label>
                            <input type="tel" id="año" name="año" pattern="[0-9]{10}" placeholder="Ej. 1234567890"
                                required />
                        </li>
                        <li>
                            <label for="kilometros">Kilómetros: </label>
                            <input type="text" id="kilometros" name="kilometros" placeholder="Ej. 000.000" required />
                        </li>
                    </form>
                </section>

                <div className="guardar">
                    <button onClick={handleReceptionForm} className="boton-guardar-datos">Guardar Datos</button>
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Registro completo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Los datos serán redirigidos a Taller</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>

            <div className="volver">
                <Link to="/main">
                    <button className="boton-volver-recepcion">Volver</button>
                </Link>
            </div>

            <h1 className="titulo-orden">Orden de Taller:</h1>

            <section className="contenedor-tareas">
                <div className="contenedor-agregar-tareas">
                    <div>
                        <input className="entrada-tareas" id="inputTareas"
                            onChange={e => setNameTask(e.target.value)}
                        />
                    </div>
                    <div>
                        <button onClick={() => {
                            setTask([...task,
                            { id: taskId, nametask: nametask }
                            ]), document.getElementById("inputTareas").value = "", setTaskID(taskId + 1)
                        }} className="boton-agregar">Agregar tarea
                        </button>
                    </div>

                    <ul className="taskList">
                        {task.map(taskItem => (
                            <li key={taskItem.id}>
                                {taskItem.nametask}{' '}
                                <button onClick={() => {
                                    setTask(task.filter(a =>
                                        a.id !== taskItem.id
                                    ));
                                }} className="boton-eliminar">
                                    x
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    </>)
}