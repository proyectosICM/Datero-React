import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function RolesModal({show, close,datosaeditar,editar,agregar}){

    const [formData,setFormData] = useState({
        nom_rol: "",
        est_rol: true
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
        setFormData({ nom_rol: "", est_rol: true });
    }


    return(
        <div>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Ruta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Nombre del rol</Form.Label>
                        <Form.Control 
                            type="text"
                            name="nom_ruta"
                            placeholder="Nombre"
                            value={formData.nom_rol}
                            onChange={(e) => setFormData({ ...formData, nom_rol: e.target.value })}
                        />
                        <Button type="submit">Crear</Button>
                        <Button variant="secondary" onClick={close}>Cerrar</Button>
                    </Form>
            
                </Modal.Body>
            </Modal>
        </div>
    );
}