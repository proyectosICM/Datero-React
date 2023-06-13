import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { RolesModal } from "./rolesModal";

export function RolesTabla({ url }) {

    const [datos, setDatos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [datosEdit, setDatosEdit] = useState(null);

    const ListarDatos = useCallback(async () => {
        const results = await axios.get(url);
        setDatos(results.data);
    }, [url]);

    useEffect(() => {
        ListarDatos();
    }, [ListarDatos]);

    const agregarDistrito = (distrito) => {
        axios.post(url, distrito)
            .then(() => {
                closeModal();
                console.log(distrito);
                ListarDatos();
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const editarDistritos = (rol) => {
        axios.put(`http://localhost:8080/api/roles/${rol.id_rol}`, rol)
            .then(() => {
                closeModal();
                ListarDatos();
            })
            .catch((error) => {
                console.log(error);
            })
    };


    const habilitardistrito = (id) => {
        axios
            .get(`http://localhost:8080/api/roles/${id}`)
            .then((response) => {
                const rol = response.data;
                rol.est_rol = true;
                axios
                    .put(`http://localhost:8080/api/roles/${id}`, rol)
                    .then(() => {
                        ListarDatos();
                    });
            })
    };

    const deshabilitardistrito = (id) => {
        axios
            .get(`http://localhost:8080/api/roles/${id}`)
            .then((response) => {
                const rol = response.data;
                rol.est_rol = false;
                axios
                    .put(`http://localhost:8080/api/roles/${id}`, rol)
                    .then(() => {
                        ListarDatos();
                    });
            })
    };

    const edit = (bus) => {
        setDatosEdit(bus);
        setShowModal(true);
    }

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    return (
        <div className="container-crud">
            <Button variant="success" onClick={openModal}> + </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE DEL ROL</th>
                        <th>ESTADO</th>
                        <th>GESTION</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_rol}>
                            <td>{dato.id_rol}</td>
                            <td>{dato.nom_rol}</td>
                            <td>{dato.est_rol ? "Habilitada" : "Deshabilitada"}</td>
                            <td>
                                <Button variant="success" onClick={() => edit(dato)} >Editar</Button>
                                <Button
                                    variant={dato.est_rol ? "warning" : "primary"}
                                    onClick={() => {
                                        if (dato.est_rol) {
                                            deshabilitardistrito(dato.id_rol);
                                        } else {
                                            habilitardistrito(dato.id_rol);
                                        }
                                    }}
                                >
                                    {dato.est_rol ? "Deshabilitar" : "Habilitar"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <RolesModal
                show={showModal}
                close={closeModal}
                agregar={agregarDistrito}
                datosaeditar={datosEdit}
                editar={editarDistritos}
            />
        </div>
    );
}