import React, { useState } from "react";
import { BusesTabla } from "./busesTabla";
import { useParams } from "react-router-dom";
import { busesTURL, busesHURL, busesDURL } from "../../API/apiurls";
import { BotonesCRUD } from "../../Common/botonesCRUD";


export function BusesC() {

    const { id_emp } = useParams();
    const [abrir, setAbrir] = useState(false);
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");


    const urlT = `${busesTURL}/${id_emp}`;
    const urlH = `${busesHURL}/${id_emp}`;
    const urlD = `${busesDURL}/${id_emp}`;



    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
    }

    const handleAbrirModal = () => {
        if (!abrir) {
            setAbrir(true);
        } else {
            setAbrir(false);
        }
    }

    const handleCerrarModal = () => {
        if (abrir) {
            setAbrir(false);
        }
    }

    return (
        <div className="container-crud">
            <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} retroceder="/menuBuses" />

            {tablaSeleccionada === "Habilitados" && (
                <BusesTabla il={id_emp} url={urlH} abrir={abrir} cerrar={handleCerrarModal} />
            )}
            {tablaSeleccionada === "Deshabilitados" && (
                <BusesTabla il={id_emp} url={urlD} abrir={abrir} cerrar={handleCerrarModal} />
            )}
            {tablaSeleccionada === "Todos" && (
                <BusesTabla il={id_emp} url={urlT} abrir={abrir} cerrar={handleCerrarModal} />
            )}

        </div>
    );
}
