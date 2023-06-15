import React, { useState } from "react";
import { DistritoTabla } from "./distritoTabla";
import { BotonesCRUD } from "../../Common/botonesCRUD";

export function DistritoC(){

    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitados");
    const h = 1;
    const d = 0;
    const urlT = ("http://localhost:8080/api/distritos");
    const urlH = (`http://localhost:8080/api/distritos/disH/${h}`);
    const urlD = (`http://localhost:8080/api/distritos/disH/${d}`);

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
    }

    const [abrir, setAbrir] = useState(false);

    const handleAbrirModal = () => {
        if(!abrir){
            setAbrir(true);
            console.log(abrir);
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
                <DistritoTabla url={urlH} abrir={abrir} cerrar={handleCerrarModal}/>
            )}
            {tablaSeleccionada === "Deshabilitados" && (
                <DistritoTabla url={urlD} abrir={abrir} cerrar={handleCerrarModal}/>
            )}
            {tablaSeleccionada === "Todos" && (
                <DistritoTabla url={urlT} abrir={abrir} cerrar={handleCerrarModal}/>
            )}
        </div>
    );
}