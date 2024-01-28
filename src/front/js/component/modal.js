import React, { useState } from "react";
import "../../styles/modal.css"

export default function Modal() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <>
            <Link
                onClick={toggleModal}
                className="btn-modal">
                Contacta con RRHH

            </Link >
            <div className="modal">
                <div className="overlay"></div>
                <div className="modal-content"></div>
                <p>Teléfono de Recursos Humanos: +34 - 000 000 000</p>
                <p>Email: recursoshumanos@hbcustoms.es</p>
                <p>Oficina: Avenida Cuatro Frikis 5, Madrid</p> 
                <button className="close-modal" onClick={toggleModal}>X</button>
            </div>
        </>
    )
}