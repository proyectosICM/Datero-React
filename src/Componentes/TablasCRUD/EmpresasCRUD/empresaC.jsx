import React, {  useState } from "react";
import { Button} from "react-bootstrap";
import { EmpresasT } from "./empresasT";
import { EmpresasH } from "./empresasH";
import { EmpresasD } from "./empresasD";
export function EmpresasC(){

    const [mostrartabla, setMostrarTabla] = useState(true)
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Todas");

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
        setMostrarTabla(true);
    }
    return (
        <div>
            <Button onClick={() => handleMostrarTabla("Habilitadas")}>Empresas Habilitadas</Button>
            <Button onClick={() => handleMostrarTabla("Deshabilitadas")}>Empresas Deshabilitadas</Button>
            <Button onClick={() => handleMostrarTabla("Todas")}>Ver todas las Empresas</Button>

            <div className="container-crud" >
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
        </div>
    );
}