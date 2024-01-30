import React, { useContext, useState } from "react";
import logoform from "../../img/logoform.png";
import "../../styles/reception.css";
import { Link, Navigate } from "react-router-dom";

export const Reception = () =>  {
    const [protect, setProtect] = useState();
    const [nametask, setNameTask] = useState(' ')
    const [task, setTask] = useState([]);

    let taskId = 0;
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

                <div className="guardar">
                    <button className="boton-guardar-datos">Guardar Datos</button>
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
                    <div className="lista-tareas-recepcion">
                        <input className="input-tareas" value={nametask}
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
                </div>
            </section>

        </div>
    </>)
}