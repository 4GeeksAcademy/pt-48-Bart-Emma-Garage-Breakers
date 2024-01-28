import React, { useContext } from "react"
import logo from "../../img/logo.png";
import background from "../../img/fondo.jpg";
import "../../styles/login.css";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    return (<>
        <div className="login-wrapper">
            <img className="login-background" src={background} />
            <div className="login">
                <img id="loginLogo" src={logo} />
            </div>
            <section className="hellblade-login">
                <div className="login-contenedor">
                    <div className="formulario">
                        <form action="#">
                            <h2>Hellblade Customs</h2>
                            <div className="input-contenedor">
                                <i className="fa-solid fa-user"></i>
                                <input type="usuario" required />
                                <label for="usuario">Usuario</label>
                            </div>
                            <div className="input-contenedor">
                                <i className="fa-solid fa-lock"></i>
                                <input type="password" required />
                                <label for="password">Contraseña</label>
                            </div>
                        </form>
                        <div className="iniciar">
                            <Link to="/main">
                                <button className="boton-iniciar" type="button">Iniciar sesión</button>
                            </Link>
                            <div className="registrar">
                                <p>No estás registrado <a href="..\modal"> Contacta con RRHH</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>)
}