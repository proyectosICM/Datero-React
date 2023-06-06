import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function EmpresaModal({show, close, agregar, datosaeditar, editar}){

    const [formData,setFormData] = useState({
        nom_emp: "",
        est_emp: true
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
        setFormData({ nom_emp: "", est_emp: true });
    }


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
                        <Button type="submit">Crear</Button>
                        <Button variant="secondary" onClick={close}>Cerrar</Button>
                    </Form>

                </Modal.Body>
            </Modal>
        </div>
    );
}