import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { DistritoModal } from "./distritoModal";

export function DistritoTabla({ url }) {

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

    const editarDistritos = (distrito) => {
        axios.put(`http://localhost:8080/api/distritos/${distrito.id_dis}`, distrito)
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
            .get(`http://localhost:8080/api/distritos/${id}`)
            .then((response) => {
                const distritos = response.data;
                distritos.est_dis = true;
                axios
                    .put(`http://localhost:8080/api/distritos/${id}`, distritos)
                    .then(() => {
                        ListarDatos();
                    });
            })
    };

    const deshabilitardistrito = (id) => {
        axios
            .get(`http://localhost:8080/api/distritos/${id}`)
            .then((response) => {
                const distritos = response.data;
                distritos.est_dis = false;
                axios
                    .put(`http://localhost:8080/api/distritos/${id}`, distritos)
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
        <>
            <Button variant="success" onClick={openModal}> + </Button>
            <Table striped bordered hover>
                <thead>
                    <th>ID</th>
                    <th>NOMBRE DEL DISTRITO</th>
                    <th>ESTADO</th>
                    <th>GESTION</th>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_dis}>
                            <td>{dato.id_dis}</td>
                            <td>{dato.nom_dis}</td>
                            <td>{dato.est_dis ? "Habilitado" : "Deshabilitado"}</td>
                            <td>
                                <Button variant="success" onClick={() => edit(dato)} >Editar</Button>
                                <Button
                                    variant={dato.est_dis ? "warning" : "primary"}
                                    onClick={() => {
                                        if (dato.est_dis) {
                                            deshabilitardistrito(dato.id_dis);
                                        } else {
                                            habilitardistrito(dato.id_dis);
                                        }
                                    }}
                                >
                                    {dato.est_dis ? "Deshabilitar" : "Habilitar"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <DistritoModal
                show={showModal}
                close={closeModal}
                agregar={agregarDistrito}
                datosaeditar={datosEdit}
                editar={editarDistritos}
            />
        </>
    );
}