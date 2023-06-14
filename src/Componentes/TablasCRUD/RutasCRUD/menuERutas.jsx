import React from "react";
import { MenuEmpresas } from "../../Common/menuEmpresas";

export function MenuERutas(){
    return (
        <div>
            <h1>Menú de Trabajadores por Empresa</h1>
            <MenuEmpresas ruta="/rutasxemp" />
        </div>
    );
}