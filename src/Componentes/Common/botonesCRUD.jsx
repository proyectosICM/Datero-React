import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { BsCheck, BsX } from 'react-icons/bs';
//import { IoArrowBackCircleSharp } from 'react-icons/io';
import './botonesCRUD.css';

export function BotonesCRUD({ activador, btnTabla, abrir }) {
    return (
        <>
            <ButtonGroup className="tabla-buttons">
                <Button variant="warning" >
                     Atras </Button>
                <Button variant="primary" onClick={() => activador("Habilitados")} className={btnTabla === "Habilitados" ? "active" : ""}>
                    <BsCheck className="button-icon" />Mostrar Habilitados
                </Button>
                <Button variant="primary" onClick={() => activador("Deshabilitados")} className={btnTabla === "Deshabilitados" ? "active" : ""}>
                    <BsX className="button-icon" />Mostrar Deshabilitados
                </Button>
                <Button variant="primary" onClick={() => activador("Todos")} className={btnTabla === "Todos" ? "active" : ""}>Mostrar Todos</Button>
                <Button variant="success" onClick={() => abrir()}> + </Button>
            </ButtonGroup>
        </>

    );
}