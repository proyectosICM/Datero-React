import React, { useState } from "react";
import { TrabajadorTabla } from "./trabajadorTabla";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import { BsCheck, BsX, BsPeopleFill } from 'react-icons/bs';
import './trabajadorC.css';

export function TrabajadorC() {
  const { id_emp } = useParams();
  const urlT = `http://localhost:8080/api/trabajadores/trabajadoresxEmpT/${id_emp}`;
  const urlH = `http://localhost:8080/api/trabajadores/trabajadoresxEmpH/${id_emp}/1`;
  const urlD = `http://localhost:8080/api/trabajadores/trabajadoresxEmpH/${id_emp}/0`;

  const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");

  const handleMostrarTabla = (tabla) => {
    setTablaSeleccionada(tabla);
  };

  return (
    <div className="container-crud">
      <ButtonGroup className="tabla-buttons">
        <Button
          variant="primary"
          onClick={() => handleMostrarTabla("Habilitados")}
          className={tablaSeleccionada === "Habilitados" ? "active" : ""}
        >
          <BsCheck className="button-icon" />
          Habilitados
        </Button>
        <Button
          variant="primary"
          onClick={() => handleMostrarTabla("Deshabilitados")}
          className={tablaSeleccionada === "Deshabilitados" ? "active" : ""}
        >
          <BsX className="button-icon" />
          Deshabilitados
        </Button>
        <Button
          variant="primary"
          onClick={() => handleMostrarTabla("Todos")}
          className={tablaSeleccionada === "Todos" ? "active" : ""}
        >
          <BsPeopleFill className="button-icon" />
          Todos
        </Button>
      </ButtonGroup>
      {tablaSeleccionada === "Habilitados" && (
        <TrabajadorTabla il={id_emp} url={urlH} />
      )}
      {tablaSeleccionada === "Deshabilitados" && (
        <TrabajadorTabla il={id_emp} url={urlD} />
      )}
      {tablaSeleccionada === "Todos" && (
        <TrabajadorTabla il={id_emp} url={urlT} />
      )}
    </div>
  );
}
