import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BsX } from "react-icons/bs";

export function ParaderoXRutaModal({ show, close, datosaeditar, editar, agregar, emp }) {

    const [formData, setFormData] = useState({
        paraderosModel: null
    });
    const [paraderos, setParaderos] = useState([]);
    const [editando, setEditando] = useState(false);

    const d = 1
    const ListarDistritos = useCallback(async () => {
        const response = await axios.get(`http://localhost:8080/api/paraderos/parH/${d}`);
        setParaderos(response.data);
    }, []);

    useEffect(() => {
        if (datosaeditar) {
            setFormData({ ...datosaeditar });
            setEditando(true);
        }
        ListarDistritos();
    }, [ListarDistritos, datosaeditar]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editando) {
            const updatedFormData = { ...formData };
            if (updatedFormData.paraderosModel && typeof updatedFormData.paraderosModel === "object") {
                updatedFormData.paraderosModel = updatedFormData.paraderos.id_par;
            }
            editar(updatedFormData);
        } else {
            agregar(formData);
        }
        close();
        limpiar();

    }

    const limpiar = () => {
        setEditando(false);
    }

    return (
        <>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Paradero de ruta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Paradero</Form.Label>
                        <Form.Select
                            name="ruta"
                            value={formData.paraderosModel ? formData.paraderosModel.id_rp : ""}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                setFormData({ ...formData, paraderosModel: selectedId });
                            }}
                        >
                            <option  value={formData.paraderosModel ? formData.paraderosModel.id_rp : ""}>
                                {formData.paraderosModel ? formData.paraderosModel.nom_par : "Seleccione una paradero"}
                            </option>
                            {paraderos.map((paradero) => (
                                <option key={paradero.id_par} value={paradero.id_par}>
                                    {paradero.nom_par}
                                </option>
                            ))}
                        </Form.Select>

                        <div className="modal-buttons">
                            <Button type="submit">
                                {editando ? "Guardar cambios" : "Crear"}
                            </Button>
                            <Button onClick={close} variant='secondary'>
                                <BsX className="button-icon" />
                                Cerrar
                            </Button>
                            </div>
                    </Form>
                            </Modal.Body>
            </Modal>
        </>
    );
}