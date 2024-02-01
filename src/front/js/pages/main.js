import React, { useContext, useState, useEffect } from "react";
import garage from "../../img/garage.jpg";
import reception from "../../img/reception.jpg";
import main from "../../img/main.png";
import "../../styles/main.css";
import { Link, Navigate } from "react-router-dom";

export const Main = () => {
    const [protect, setProtect] = useState();
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
    </section>

    <div className="lateralDch">
    <img src= { garage } />
    </div>
    </div>
        
    </>)
}