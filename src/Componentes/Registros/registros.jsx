import React from "react";
import '../../Estilos/registros.css'
import { Form } from "react-bootstrap";
import { RegistrosTabla } from "./registrosTabla";
import { TfiCreditCard } from "react-icons/tfi";
import { FaClipboardList } from "react-icons/fa";

export function Registros(){
    return(
        <div className="container-registros">
            <h1><FaClipboardList />Registros de cada vehiculo</h1>
            <h2>UNIDAD</h2>

            <div className="inp">
                <Form.Label><TfiCreditCard /> Ingrese el numero de la placa </Form.Label>
                <Form.Control
                    placeholder="ABC-000"
                />
            </div>

            <RegistrosTabla />
        </div>
    );
}