import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { RutasTabla } from "./rutasTabla";
import { useParams } from "react-router-dom";

export function RutasC(){

    const {id_emp} = useParams();
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitadas");

    const urlT = `http://localhost:8080/api/rutas/rutasXEmpT/${id_emp}`
    const urlH = `http://localhost:8080/api/rutas/rutasXEmpH/${id_emp}`
    const urlD = `http://localhost:8080/api/rutas/rutasXEmpD/${id_emp}`

    const handleMostrarTabla = (tabla) =>{
        setTablaSeleccionada(tabla);
    }

    return(
        <div className="container-crud">
            <Button variant="primary" onClick={() => handleMostrarTabla("Habilitadas")}>Mostrar Rutas Habilitadas</Button>
            <Button variant="primary" onClick={() => handleMostrarTabla("Deshabilitadas")}>Mostrar Rutas Deshabilitadas</Button>
            <Button variant="primary" onClick={() => handleMostrarTabla("Todas")}>Mostrar Todas Las Rutas</Button>

            {tablaSeleccionada === "Habilitadas" && (
                <RutasTabla url={urlH} />
            )}
            {tablaSeleccionada === "Deshabilitadas" && (
                <RutasTabla url={urlD} />
            )}
            {tablaSeleccionada === "Todas" && (
                <RutasTabla url={urlT} />
            )}
        </div>
    );
}