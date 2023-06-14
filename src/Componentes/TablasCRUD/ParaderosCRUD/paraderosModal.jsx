import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function ParaderosModal({ show, close, datosaeditar, editar, agregar, il }) {

    const [formData, setFormData] = useState({
        nom_par: "",
        est_par: true,
        distritosModel: null,
        latitud: "",
        longitud: ""

    });
    const [distritos, setDistritos] = useState([]);
    const [editando, setEditando] = useState(false);

    const ListarDistritos = useCallback(async () => {
        const response = await axios.get(`http://localhost:8080/api/distritos`);
        setDistritos(response.data);
    }, []);


    useEffect(() => {
        if (datosaeditar) {
            setFormData({ ...datosaeditar });
            setEditando(true)
        } else {
            limpiar();
        }
        ListarDistritos();
    }, [datosaeditar, ListarDistritos])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editando) {
            const updatedFormData = { ...formData };
            if (
                updatedFormData.distritosModel &&
                typeof updatedFormData.distritosModel === "object"
            ) {
                updatedFormData.distritosModel = updatedFormData.distritosModel.id_dis;
            }
            editar(updatedFormData);
            limpiar();
        } else {
            agregar(formData);
        }
        close();
        limpiar();
    }

    const limpiar = () => {
        setFormData({ nom_par: "", est_par: true, distritosModel: null, longitud: "", latitud: "" });
        setEditando(false);
    }

    return (
        <div>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar paradero</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom_par"
                            placeholder="Nombre"
                            value={formData.nom_par}
                            onChange={(e) => setFormData({ ...formData, nom_par: e.target.value })}
                        />

                        <Form.Label>Distritos</Form.Label>
                        <Form.Select
                            name="conductor"
                            value={formData.distritosModel ? formData.distritosModel.id_dis : ""}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                /*const selectedWorker = rutas.find(
                                    (worker) => worker === selectedId
                                );*/
                                setFormData({ ...formData, distritosModel: selectedId });
                            }}
                        >
                            <option value={formData.distritosModel ? formData.distritosModel.id_rol : ""}>
                                {formData.distritosModel ? formData.distritosModel.nom_rol
                                    : "Seleccione un rol"}
                            </option>
                            {distritos.map((distrito) => (
                                <option key={distrito.id_dis} value={distrito.id_dis}>
                                    {distrito.nom_dis}
                                </option>
                            ))}
                        </Form.Select>


                        <Form.Label>Latitud:</Form.Label>
                        <Form.Control
                            type="text"
                            name="latitud"
                            placeholder="latitud"
                            value={formData.latitud}
                            onChange={(e) => setFormData({ ...formData, latitud: e.target.value })}
                        />


                        <Form.Label>Longitud:</Form.Label>
                        <Form.Control
                            type="text"
                            name="longitud"
                            placeholder="longitud"
                            value={formData.longitud}
                            onChange={(e) => setFormData({ ...formData, longitud: e.target.value })}
                        />
                        <Button type="submit">Crear</Button>
                        <Button onClick={close}>Cerrar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}