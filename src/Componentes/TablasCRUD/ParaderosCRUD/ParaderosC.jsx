import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ParaderosTabla } from "./ParaderosTabla";
import { BotonesCRUD } from "../../Common/botonesCRUD";

export function ParaderosC(){

    const [abrir, setAbrir] = useState()
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitados");
    const urlT = ("http://localhost:8080/api/paraderos");
    const urlH = (`http://localhost:8080/api/paraderos/parH/1`);
    const urlD = (`http://localhost:8080/api/paraderos/parH/0`);

    const handleMostrarTabla = (tabla) =>{
        setTablaSeleccionada(tabla);
    }

    const handleAbrirModal = () => {
        if(!abrir){
            setAbrir(true);
        } else {
            setAbrir(false);
        }
    }

    const handleCerrarModal = () => {
        if(abrir){
            setAbrir(false);
        }
    }

    return(
        <div className="container-crud">
            <div className="set-botones">
                <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} />
            </div>

            {tablaSeleccionada === "Habilitados" && (
                <ParaderosTabla url={urlH} abrir={abrir} cerrar={handleCerrarModal}/>
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