import React, { useContext } from "react";
import logoform from "../../img/logoform.png";
import "../../styles/reception.css";
import { Link } from "react-router-dom";

export const Reception = () =>  {
    return (<>
    <div className="reception-wrapper">
    <img className="background-reception" src={ logoform } />
    
    <div className="contenedor-datos">
        <h1><u>Formulario de Contacto</u></h1>
        <section className="cliente">
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

        <section className="motocicleta">
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
        <div className="volver">
            <Link to="\main">
                <button className="boton-volver-recepcion">Volver</button>
            </Link>
        </div>

    </div> 
</div>
    </>)
}

