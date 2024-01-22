import React from "react";
import "../../styles/login.css";
import { FaUser, FaLock } from "react-icons/fa";

export const Login = () => {
  
    return (
    <div className="wrapper">
      <form action="">
        <h1>Accede a tu cuenta</h1>
        <h2>Mira qué está pasando en tu negocio</h2>
        <div className="input-box">
          <input type="text" placeholder="Escribe tu nombre de usuario" />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Escribe tu contraseña" />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Recuérdame
          </label>
          <a href="#">¿Has olvidado la contraseña?</a>
        </div>

        <button type="submit">Acceder</button>

        <div className="register-link">
          <p>
            ¿No tienes una cuenta? <a href="#">Regístrate</a>
          </p>
        </div>
      </form>
    </div>
  );
};


