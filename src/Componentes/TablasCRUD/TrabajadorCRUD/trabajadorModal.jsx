import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function TrabajadorModal({show, close,datosaeditar,editar,agregar}){

    const [formData,setFormData] = useState({
        nom_tra: "",
        ape_tra: "",
        dni_tra: "",
        est_tra: true
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

    const limpiar = () => {
        setFormData({ placa_bus: "", mod_bus: "", est_bus: true });
    }

    return (
        <div>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton onSubmit={handleSubmit}>
                    <Modal.Title>Agregar Buses</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Label>Placa</Form.Label>
                        <Form.Control
                            type="text"
                            name="placa_bus"
                            placeholder="Placa"
                            value={formData.placa_bus}
                            onChange={(e) => setFormData({ ...formData, placa_bus: e.target.value })}
                        />

                        <Form.Label>Modelo</Form.Label>
                        <Form.Control
                            type="text"
                            name="placa_bus"
                            placeholder="Placa"
                            value={formData.mod_bus}
                            onChange={(e) => setFormData({ ...formData, mod_bus: e.target.value })}
                        />

                        <Form.Label>Conductor</Form.Label>
                        <Form.Control
                            type="text"
                            name="placa_bus"
                            placeholder="Conductor"
                            value={formData.placa_bus}
                            onChange={(e) => setFormData({ ...formData, trabajadorModel: e.target.value })}
                        />

                        <Button onClick={close}>Cerrar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}