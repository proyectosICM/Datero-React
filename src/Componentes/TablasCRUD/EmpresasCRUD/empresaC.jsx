import React, {  useState } from "react";
import { Button} from "react-bootstrap";
import { EmpresasT } from "./empresasT";
import { EmpresasH } from "./empresasH";
import { EmpresasD } from "./empresasD";
import { BotonesCRUD } from "../../Common/botonesCRUD";

export function EmpresasC(){

    const [mostrartabla, setMostrarTabla] = useState(true)
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitadas");
    const [abrir, setAbrir] = useState(false);

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
        setMostrarTabla(true);
    }

    const handleAbrirModal = () => {
        if(!abrir){
            setAbrir(true);
        } else {
            setAbrir(false);
        }
    }


    return (

            <div className="container-crud" >
            <div className="set-botones">
                <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} />
            </div>

                {mostrartabla && (
                    <>
                        {tablaSeleccionada === "Habilitadas" && (
                            <EmpresasH />
                        )}
                        {tablaSeleccionada === "Deshabilitadas" && (
                            <EmpresasD />
                        )}
                        {tablaSeleccionada === "Todas" && (
                            <EmpresasT />
                        )}
                    </>

                )}
        </div>
    );
}