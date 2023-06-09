import React, { useState } from "react";
import { TrabajadorTabla } from "./trabajadorTabla";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

export function TrabajadorC(){

    const {id_emp} = useParams();
    const urlT = `http://localhost:8080/api/trabajadores/trabajadoresxEmpT/${id_emp}`;
    const urlH = `http://localhost:8080/api/trabajadores/trabajadoresxEmpH/${id_emp}`;
    const urlD = `http://localhost:8080/api/trabajadores/trabajadoresxEmpD/${id_emp}`;

    const [tablaSeleccionada,setTablaSeleccionada] = useState("Todos");

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla)
    }

    return(
        <div className="container-crud">
            <Button variant="primary" onClick={()=> handleMostrarTabla("Habilitados")}>Mostar Trabajadores Habilitados</Button>
            <Button variant="primary" onClick={()=> handleMostrarTabla("Deshabilitados")}>Mostar Trabajadores Deshabilitados</Button>
            <Button variant="primary" onClick={()=> handleMostrarTabla("Todos")}>Mostar Trabajadores Todos</Button>
            {tablaSeleccionada === "Habilitados" && (
                <TrabajadorTabla url={urlH} />
            )}
            {tablaSeleccionada === "Deshabilitados" && (
                <TrabajadorTabla url={urlD} />
            )}
            {tablaSeleccionada === "Todos" && (
                <TrabajadorTabla url={urlT} />
            )}
        </div>
    );
}