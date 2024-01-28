import React, { useContext } from "react";
import garage from "../../img/garage.jpg";
import reception from "../../img/reception.jpg";
import main from "../../img/main.png";
import "../../styles/main.css";
import { Link } from "react-router-dom";

export const Main = () => {
    return (<>
    <div className="main-wrapper">
    <img className="main-background" src={ main } />
        <div className="lateralIzq">
            <img src= { reception } />
        </div>

    <section className="section-main-reception">
        <div className="recepcion">
            <Link to="/reception">
                <button className="boton-recepcion">RECEPCIÓN</button>
            </Link>
        </div>

        <div className="taller">
            <Link to="/garage">
                <button className="boton-taller">TALLER</button>
            </Link>
        </div>

        <div className="volver">
            <Link to="/">
                <button className="boton-volver-main">Volver</button>
            </Link>
        </div>
    </section>

    <div className="lateralDch">
    <img src= { garage } />
    </div>
    </div>
        
    </>)
}