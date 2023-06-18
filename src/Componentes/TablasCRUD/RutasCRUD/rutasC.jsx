import React, { useState } from "react";
import { RutasTabla } from "./rutasTabla";
import { useParams } from "react-router-dom";
import './styles/rutasC.css';
import { BotonesCRUD } from "../../Common/botonesCRUD";

export function RutasC() {

    const { id_emp } = useParams();
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitados");

    const urlT = `http://localhost:8080/api/rutas/rutasXEmpT/${id_emp}`
    const urlH = `http://localhost:8080/api/rutas/rutasXEmpH/${id_emp}`
    const urlD = `http://localhost:8080/api/rutas/rutasXEmpD/${id_emp}`

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
    };

    const [abrir, setAbrir] = useState(false);

    const handleAbrirModal = () => {
        if(!abrir){
            setAbrir(true);
        } else {
            setAbrir(false);
        }
    };

    const handleCerrarModal = () => {
        if(abrir){
            setAbrir(false);
        }
    };

    return (
        <div className="container-crud">
            <div className="set-botones">
                <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} />
            </div>


                {tablaSeleccionada === "Habilitados" && (
                    <RutasTabla il={id_emp} url={urlH} abrir={abrir} cerrar={handleCerrarModal} />
                )}
                {tablaSeleccionada === "Deshabilitados" && (
                    <RutasTabla il={id_emp} url={urlD} abrir={abrir} cerrar={handleCerrarModal}/>
                )}
                {tablaSeleccionada === "Todos" && (
                    <RutasTabla il={id_emp} url={urlT} abrir={abrir} cerrar={handleCerrarModal}/>
                )}
        </div>
    );
}