import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { RolesModal } from "./rolesModal";
import { BotonesDeGestion } from "../../Common/botonesDeGestion";

export function RolesTabla({ url, abrir, cerrar }) {

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


    const habilitarrol = (id) => {
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

    const deshabilitarrol = (id) => {
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

    const closeModal = () => {
        setShowModal(false);
        cerrar();
        setDatosEdit(null);
    };


    return (
        <>
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
                                <BotonesDeGestion
                                    ide={`id_rol`} estado={`est_rol`} dato={dato} edit={edit}
                                    deshabilitar={deshabilitarrol} habilitar={habilitarrol}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <RolesModal
                show={showModal || abrir}
                close={closeModal}
                agregar={agregarDistrito}
                datosaeditar={datosEdit}
                editar={editarDistritos}
            />
        </>
    );
}