import React, { useState } from "react";
import { BusesTabla } from "./busesTabla";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { busesTURL, busesHURL, busesDURL } from "../../API/apiurls";
import { BotonesCRUD } from "../../Common/botonesCRUD";


export function BusesC() {

    const { id_emp } = useParams();
    const [abrir, setAbrir] = useState(false);

    const urlT = `${busesTURL}/${id_emp}`;
    const urlH = `${busesHURL}/${id_emp}`;
    const urlD = `${busesDURL}/${id_emp}`;

    const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
    }

    const handleAbrirModal = () => {
        if(!abrir){
            setAbrir(true);
        } else {
            setAbrir(false);
        }
    }


    return (
        <div className="container-crud">
            <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} />

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
