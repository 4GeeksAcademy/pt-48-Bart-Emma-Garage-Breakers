import React, { useContext } from "react";
import logo from "../../img/logo.png";
import background from "../../img/fondo.jpg";
import "../../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Login = () => {
    const { actions } = useContext(Context);
    const handleLoginForm = async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        console.log(email, password);
        const token = await actions.login(email, password);
    
        if (token) {
          localStorage.setItem("jwt", token);
        } else {
          console.log("Wrong username or password");
        }
      };
    return (<>
       <div className="login-wrapper">
        <img className="login-background" src={ background } />
       <div className="login">
        <img id="loginLogo" src={ logo } />
    </div>
    <section>
        <div className="login-contenedor">
            <div className="formulario">
                <form action="#">
                    <h2>Hellblade Customs</h2>
                    <div className="input-contenedor">
                        <i className="fa-solid fa-user"></i>
                        <input type="usuario" id="email" required />
                        <label for="usuario">Usuario</label>
                    </div>
                    <div className="input-contenedor">
                        <i className="fa-solid fa-lock"></i>
                        <input type="password" id="password" required />
                        <label for="password">Contraseña</label>
                    </div>
                </form>
                <div className="iniciar">
                    <Link to= "/main">
                        <button onClick={handleLoginForm} className="boton-iniciar" type="button">Iniciar sesión</button>
                    </Link> 
                    <div className="registrar">
                        <p>No estas registrado<a href="..\Images\gorila faltón.jpg"> Contacta con RRHH</a></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
       </div>
    </>)
}