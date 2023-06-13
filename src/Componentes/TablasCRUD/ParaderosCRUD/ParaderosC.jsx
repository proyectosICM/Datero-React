import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ParaderosTabla } from "./ParaderosTabla";

export function ParaderosC(){

    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitados");
    const urlT = ("http://localhost:8080/api/paraderos");
    const urlH = (`http://localhost:8080/api/paraderos/parH/1`);
    const urlD = (`http://localhost:8080/api/paraderos/parH/0`);

    const handleMostrarTabla = (tabla) =>{
        setTablaSeleccionada(tabla);
    }


    return(
        <div className="container-crud">
            <Button variant="primary" onClick={() => handleMostrarTabla("Habilitados")}>Mostrar Distritos Habilitados</Button>
            <Button variant="primary" onClick={() => handleMostrarTabla("Deshabilitados")}>Mostrar Distritos Deshabilitados</Button>
            <Button variant="primary" onClick={() => handleMostrarTabla("Todos")}>Mostrar Todos Los Distritos</Button>

            {tablaSeleccionada === "Habilitados" && (
                <ParaderosTabla url={urlH} />
            )}
            {tablaSeleccionada === "Deshabilitados" && (
                <ParaderosTabla url={urlD} />
            )}
            {tablaSeleccionada === "Todos" && (
                <ParaderosTabla url={urlT} />
            )}
        </div>
    );
}