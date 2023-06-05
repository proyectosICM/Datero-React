import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function EmpresaModal({show, close, agregar, datosaeditar, editar}){

    const [formData,setFormData] = useState({
        nom_emp: "",
        est_emp: ""
    });

    useEffect(()=>{
        if(datosaeditar){
            setFormData(datosaeditar);
        } else {
            limpiar();
        }
    },[datosaeditar])

    const handleSubmit = (event) => {
        event.preventDefault();
        if(datosaeditar){
            editar(formData);
        } else {
            agregar(formData);
        }
        close();
        limpiar();
    }

    const limpiar = () =>{
        setFormData("");
    }

    /*
    const handleEstadoChange = (e) => {
        const value = e.target.value === "Activo" ? "true" : "false";
        setFormData({...formData, est_emp: value})
    }
*/
    return(
        <div>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Empresa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Nombre de la empresa</Form.Label>
                        <Form.Control 
                            type="text"
                            name="nom_emp"
                            placeholder="Nombre"
                            value={formData.nom_emp}
                            onChange={(e) => setFormData({ ...formData, nom_emp: e.target.value })}
                        />
                 {/* 
                        <Form.Label>Estado</Form.Label>
       
                                                <Form.Control
                            type="text"
                            name="est_emp"
                            placeholder="Estado"
                            value={formData.est_emp}
                            onChange={(e) => setFormData({ ...formData, est_emp: e.target.value })}
                        />
                   

                        <Form.Select
                            name="est_emp"
                            value={formData.est_emp === "true" ? "Activo" : "Inactivo"}
                            onChange={handleEstadoChange}
                        >
                            <option value="">Seleccione un estado</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </Form.Select>
                             */}

                        <Button type="submit">Crear</Button>
                        <Button variant="secondary" onClick={close}>Cerrar</Button>
                    </Form>

                </Modal.Body>
            </Modal>
        </div>
    );
}