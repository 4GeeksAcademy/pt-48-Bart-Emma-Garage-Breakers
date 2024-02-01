import React from "react";
import fondo from "../../img/fondo.jpg";
import bart from "../../img/bart.png"
import emma from "../../img/emma.png"
import "../../styles/presentacion.css";
import { Link } from "react-router-dom";

export const AboutUs = () => {
    return (< >
        <div className="presentacion-wrapper">
            <div className="contenedor-presentacion">
                <div className="titulo-presentacion">
                    <h2>Equipo de Garage Breakers de 4Geeks Academy...</h2>

                </div>
                <img className="background-presentacion" src={fondo} />
                <div className="btn-home-container">
                    <Link to="/">
                        <button className="btn-home">
                            <i className="fa-solid fa-house"></i>
                        </button>
                    </Link>
                </div>
                <div className="container-photo1">
                    <img className="photo1" src={bart} />
                    <div className="descripcion1">
                        <h3>Bartolomé de la Cueva</h3>
                        <p>Desarrollador Full Stack Developer</p>
                    </div>
                </div>
                <div className="container-photo2">
                    <img className="photo2" src={emma} />
                    <div className="descripcion1">
                        <h3>Emmanuel Lucena Montalvo</h3>
                        <p>Desarrollador Full Stack Developer</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}