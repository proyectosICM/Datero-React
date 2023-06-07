import React, {  useState } from "react";
import { Button} from "react-bootstrap";
import { EmpresasT } from "./empresasT";
import { EmpresasH } from "./empresasH";
import { EmpresasD } from "./empresasD";
export function EmpresasC(){

    const [mostrartabla, setMostrarTabla] = useState(true)
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitadas");

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
        setMostrarTabla(true);
    }
    return (
        <div>

            <div className="container-crud" >
            <Button onClick={() => handleMostrarTabla("Habilitadas")}>Empresas Habilitadas</Button>
            <Button onClick={() => handleMostrarTabla("Deshabilitadas")}>Empresas Deshabilitadas</Button>
            <Button onClick={() => handleMostrarTabla("Todas")}>Ver todas las Empresas</Button>

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