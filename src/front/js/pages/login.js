import React, { useContext, useState } from "react";
import logo from "../../img/logo.png";
import background from "../../img/fondo.jpg";
import "../../styles/login.css";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Modal, Button } from 'react-bootstrap';
import { Footer } from "../component/footer";

export const Login = () => {
    const { actions } = useContext(Context);
    const [test, setTest] = useState();
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleLoginForm = async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const token = await actions.login(email, password);

        if (localStorage.getItem("token") != "undefined") {
            setTest(true);
            localStorage.setItem("jwt", token);
        } else {
            console.log("Wrong username or password");
        }
    };
    const handleSignUpForm = async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        if (email != "" && password != "") {
            const signUp = await actions.signUp(email, password);
            setShowModal(true)
        }

    };

    if (test == true) {
        return <Navigate to="/main" />
    }
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
                            <Link to="/main">
                                <button onClick={handleLoginForm} className="boton-iniciar" type="button">Iniciar sesión</button>
                                <hr />

                            </Link>
                            <button onClick={handleSignUpForm} className="boton-iniciar" type="button" variant="primary">Crear usuario</button>
                            <div className="registrar">
                                <p>No estás registrado <a href="/modal"> Contacta con RRHH</a></p>
                            </div>
                        </div>

                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Usuario registrado</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Enhorabuena. Tu usuario ha sido registrado</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cerrar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </section>
        </div>
        <Footer />
    </>)
}
