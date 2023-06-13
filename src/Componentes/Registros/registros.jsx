import React from "react";
import '../../Estilos/registros.css'
import { Form } from "react-bootstrap";
import { RegistrosTabla } from "./registrosTabla";
import { MapComponent } from "../../mapComponent";

export function Registros(){
    return(
        <div className="container-registros">
            <h1>Registros de cada vehiculo</h1>
            <h2>UNIDAD</h2>

            <div className="inp">
                <Form.Label>Ingrese el numero de la placa </Form.Label>
                <Form.Control
                    placeholder="ABC-000"
                />
            </div>

            <RegistrosTabla />
        </div>
    );
}