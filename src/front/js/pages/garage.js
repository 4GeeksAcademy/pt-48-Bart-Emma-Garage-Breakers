import React, { useContext, useState } from "react";
import logoform from "../../img/logoform.png";
import "../../styles/garage.css";
import { Link } from "react-router-dom";

export const Garage = () => {
    const [nametask, setNameTask] = useState(' ')
    const [task, setTask] = useState([]);

    return (<>
        <div className="garage-wrapper">
            <img className="background-garage" src={logoform} />

            <h1 className="titulo-taller"><u>Hellblade Customs Taller</u></h1>

            <div className="contenedor-datos-taller">
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
                            <label for="nombre">Marca: </label>
                            <input type="text" id="nombre" name="nombre" required />
                        </li>
                        <li>
                            <label for="apellidos">Modelo: </label>
                            <input type="text" id="apellidos" name="apellidos" required />
                        </li>
                        <li>
                            <label for="domicilio">Color: </label>
                            <input type="text" id="domicilio" name="domicilio" required />
                        </li>
                        <li>
                            <label for="telefono">Año: </label>
                            <input type="tel" id="telefono" name="telefono" pattern="[0-9]{10}" placeholder="Ej. 1234567890"
                                required />
                        </li>
                        <li>
                            <label for="kilometros">Kilómetros: </label>
                            <input type="text" id="kilometros" name="kilometros" placeholder="Ej. 000.000" required />
                        </li>
                    </form>
                </section>
            </div>

            <div className="volver">
                <Link to="/main">
                    <button className="boton-volver-taller">Volver</button>
                </Link>
            </div>

            <h1 className="titulo-orden-taller">Orden de Trabajo:</h1>

            <section className="contenedor-tareas-taller">
                <div className="contenedor-agregar-tareas">
                    <div>
                        <input className="entrada-tareas" value={nametask}
                            onChange={e => setNameTask(e.target.value)}
                        />
                    </div>
                    <div>
                        <button onClick={() =>
                            setTask([...task,
                            { id: taskId++, nametask: nametask }
                            ])} className="boton-agregar">Agregar tarea
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
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button className="boton-enviar">Enviar</button>
                </div>
            </section>
            <section className="contenedor-lista-motos">
                <div className="titulo-listado">
                    <h2>Lista de Motocicletas</h2>
                </div>
            </section>
        </div>
    </>)
}
