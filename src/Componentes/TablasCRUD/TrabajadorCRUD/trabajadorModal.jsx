import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function TrabajadorModal({ show, close, datosaeditar, editar, agregar, il }) {

    const [formData, setFormData] = useState({
        nom_tra: "",
        ape_tra: "",
        dni_tra: "",
        empresasModel: il,
        user_tra: "",
        pass_tra: "",
        rolesModel: "",
        est_tra: true
    });
    const [roles, setRoles] = useState([]);
    const [editando, setEditando] = useState(false);

    const ListarRoles = useCallback(async () => {
        const response = await axios.get(`http://localhost:8080/api/roles`);
        setRoles(response.data);
    }, []);


    useEffect(() => {
        if (datosaeditar) {
            setFormData({ ...datosaeditar });
            setEditando(true)
        } else {
            limpiar();
        }
        ListarRoles();
    }, [datosaeditar, ListarRoles])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editando) {
            const updatedFormData = { ...formData };
            if (
                updatedFormData.rolesModel &&
                typeof updatedFormData.rolesModel === "object"
            )
                editar(updatedFormData);
            console.log(datosaeditar);
            limpiar();
        } else {
            agregar(formData);
            console.log(datosaeditar);
        }
        close();
        limpiar();
    }

    const limpiar = () => {
        setFormData({ nom_tra: "", ape_tra: "", dni_tra: "", empresasModel: il, user_tra: "", pass_tra: "", rolesModel: "", est_tra: true });
        setEditando(false);
    }

    return (
        <div>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Trabajador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom_tra"
                            placeholder="Nombre"
                            value={formData.nom_tra}
                            onChange={(e) => setFormData({ ...formData, nom_tra: e.target.value })}
                        />

                        <Form.Label>Apellido:</Form.Label>
                        <Form.Control
                            type="text"
                            name="ape_tra"
                            placeholder="Apellido"
                            value={formData.ape_tra}
                            onChange={(e) => setFormData({ ...formData, ape_tra: e.target.value })}
                        />

                        <Form.Label>DNI:</Form.Label>
                        <Form.Control
                            type="text"
                            name="placa_bus"
                            placeholder="Placa"
                            value={formData.dni_tra}
                            onChange={(e) => setFormData({ ...formData, dni_tra: e.target.value })}
                        />
                        <Form.Label>Usuario:</Form.Label>
                        <Form.Control
                            type="text"
                            name="placa_bus"
                            placeholder="Placa"
                            value={formData.user_tra}
                            onChange={(e) => setFormData({ ...formData, user_tra: e.target.value })}
                        />

                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control
                            type="text"
                            name="pass_tra"
                            placeholder="Placa"
                            value={formData.pass_tra}
                            onChange={(e) => setFormData({ ...formData, pass_tra: e.target.value })}
                        />

                        <Form.Label>Rol</Form.Label>
                        <Form.Select
                            name="conductor"
                            value={formData.rolesModel ? formData.rolesModel.id_rol : ""}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                /*const selectedWorker = rutas.find(
                                    (worker) => worker === selectedId
                                );*/
                                setFormData({ ...formData, rolesModel: selectedId });
                            }}
                        >
                            <option value={formData.rolesModel ? formData.rolesModel.id_rol : ""}>
                                {formData.rolesModel ? formData.rolesModel.nom_rol
                                    : "Seleccione una ruta"}
                            </option>
                            {roles.map((rol) => (
                                <option key={rol.id_rol} value={rol.id_rol}>
                                    {rol.nom_rol} 
                                </option>
                            ))}
                        </Form.Select>

                        <Button type="submit">Crear</Button>
                        <Button onClick={close}>Cerrar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}