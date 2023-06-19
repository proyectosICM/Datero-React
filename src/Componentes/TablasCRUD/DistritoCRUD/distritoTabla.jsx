import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { DistritoModal } from "./distritoModal";
import {
    agregarElemento,
    editarElemento,
    habilitarElemento,
    deshabilitarElemento,
} from '../../API/apiCRUD';

import {distritosURL} from '../../API/apiurls';

export function DistritoTabla({ url, abrir, cerrar }) {

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
        agregarElemento(distritosURL, distrito, closeModal, ListarDatos);
    };

    const editarDistritos = (distrito) => {
        const apiurledit = `${distritosURL}/${distrito.id_dis}`;
        editarElemento(apiurledit, distrito, closeModal, ListarDatos);
    };

    const habilitardistrito = (id) => {
        habilitarElemento(distritosURL, id, `est_dis`, ListarDatos);
    };

    const deshabilitardistrito = (id) => {
        deshabilitarElemento(distritosURL, id, `est_dis`, ListarDatos);
    };

    const edit = (bus) => {
        setDatosEdit(bus);
        setShowModal(true);
    }


    const closeModal = () => {
        cerrar();
        setShowModal(false);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE DEL DISTRITO</th>
                        <th>ESTADO</th>
                        <th>GESTION</th>
                    </tr>
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
                show={showModal || abrir}
                close={closeModal}
                agregar={agregarDistrito}
                datosaeditar={datosEdit}
                editar={editarDistritos}
            />
        </>
    );
}