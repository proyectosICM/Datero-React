import React, { useState } from "react";
import { BusesTabla } from "./busesTabla";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";


export function BusesC(){

    const {id_emp} = useParams();
    const urlT = `http://localhost:8080/api/buses/busxempT/${id_emp}`;
    const urlH = `http://localhost:8080/api/buses/busxempH/${id_emp}`;
    const urlD = `http://localhost:8080/api/buses/busxempD/${id_emp}`;
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
    }
    return(
        <div className="container-crud">
            <Button variant="primary" onClick={() => handleMostrarTabla("Habilitados")}>Mostar Buses Habilitados</Button>
            <Button variant="primary" onClick={() => handleMostrarTabla("Desahabilitados")}>Mostar Buses Habilitados</Button>
            <Button variant="primary" onClick={() => handleMostrarTabla("Todos")}>Mostar Todos Los Buses</Button>

            {tablaSeleccionada === "Habilitados" && (
                <BusesTabla il={id_emp} url={urlH} />
            )}
            {tablaSeleccionada === "Desahabilitados" && (
                <BusesTabla il={id_emp} url={urlD} />
            )}
            {tablaSeleccionada === "Todos" && (
                <BusesTabla il={id_emp} url={urlT} />
            )}

        </div>
    );
}
