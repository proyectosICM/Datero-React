import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DistritoTabla } from "./distritoTabla";
import { useResolvedPath } from "react-router-dom";

export function DistritoC(){

    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitados");
    const h = 1;
    const d = 0;
    const urlT = ("http://localhost:8080/api/distritos");
    const urlH = (`http://localhost:8080/api/distritos/disH/${h}`);
    const urlD = (`http://localhost:8080/api/distritos/disH/${d}`);

    const handleMostrarTabla = (tabla) =>{
        setTablaSeleccionada(tabla);
    }


    return(
        <div className="container-crud">
            <Button variant="primary" onClick={() => handleMostrarTabla("Habilitados")}>Mostrar Distritos Habilitados</Button>
            <Button variant="primary" onClick={() => handleMostrarTabla("Deshabilitados")}>Mostrar Distritos Deshabilitados</Button>
            <Button variant="primary" onClick={() => handleMostrarTabla("Todos")}>Mostrar Todos Los Distritos</Button>

            {tablaSeleccionada === "Habilitados" && (
                <DistritoTabla url={urlH} />
            )}
            {tablaSeleccionada === "Deshabilitados" && (
                <DistritoTabla url={urlD} />
            )}
            {tablaSeleccionada === "Todos" && (
                <DistritoTabla url={urlT} />
            )}
        </div>
    );
}