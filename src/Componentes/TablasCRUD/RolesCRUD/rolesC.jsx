import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { RolesTabla } from "./rolesTabla";

export function RolesC(){

    const {id_emp} = useParams();
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitadas");

    const urlT = `http://localhost:8080/api/roles`
    const urlH = `http://localhost:8080/api/roles/rolH/1`
    const urlD = `http://localhost:8080/api/roles/rolH/0`

    const handleMostrarTabla = (tabla) =>{
        setTablaSeleccionada(tabla);
    }

    return(
        <div className="container-crud">
            <Button variant="primary" onClick={() => handleMostrarTabla("Habilitadas")}>Mostrar Roles Habilitadas</Button>
            <Button variant="primary" onClick={() => handleMostrarTabla("Deshabilitadas")}>Mostrar Roles Deshabilitadas</Button>
            <Button variant="primary" onClick={() => handleMostrarTabla("Todas")}>Mostrar Roles Rutas</Button>

            {tablaSeleccionada === "Habilitadas" && (
                <RolesTabla il={id_emp} url={urlH}/>
            )}
            {tablaSeleccionada === "Deshabilitadas" && (
                <RolesTabla il={id_emp} url={urlD} />
            )}
            {tablaSeleccionada === "Todas" && (
                <RolesTabla il={id_emp} url={urlT} />
            )}
      
        </div>
    );
}