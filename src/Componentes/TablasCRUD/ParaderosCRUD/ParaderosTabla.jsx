import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { ParaderosModal } from "./paraderosModal";
import { SiGooglemaps } from 'react-icons/si';
import { Link } from "react-router-dom";
import { BotonesDeGestion } from "../../Common/botonesDeGestion";

export function ParaderosTabla({ url, abrir, cerrar }) {

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

    const agregarDistrito = (paradero) => {
        console.log(paradero);
        const requestData = {
            nom_par: paradero.nom_par,
            est_par: paradero.est_par,
            distritosModel: {
                id_dis: paradero.distritosModel
            },
            longitud: paradero.longitud,
            latitud: paradero.latitud
        };
        axios.post('http://localhost:8080/api/paraderos', requestData)
            .then(() => {
                closeModal();
                ListarDatos();
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const editarDistritos = (paradero) => {
        const requestData = {
            nom_par: paradero.nom_par,
            est_par: paradero.est_par,
            distritosModel: {
                id_dis: paradero.distritosModel
            },
            longitud: paradero.longitud,
            latitud: paradero.latitud
        };
        axios.put(`http://localhost:8080/api/paraderos/${paradero.id_par}`, requestData)
            .then(() => {
                closeModal();
                ListarDatos();
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const habilitarparadero = (id) => {
        axios
            .get(`http://localhost:8080/api/paraderos/${id}`)
            .then((response) => {
                const paradero = response.data;
                paradero.est_par = true;
                axios
                    .put(`http://localhost:8080/api/paraderos/${id}`, paradero)
                    .then(() => {
                        ListarDatos();
                    });
            })
    };

    const deshabilitarparadero = (id) => {
        axios
            .get(`http://localhost:8080/api/paraderos/${id}`)
            .then((response) => {
                const paradero = response.data;
                paradero.est_par = false;
                axios
                    .put(`http://localhost:8080/api/paraderos/${id}`, paradero)
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
                        <th>PARADEROS</th>
                        <th>NOMBRE DEL DISTRITO</th>
                        <th>COORDENADAS</th>
                        <th>ESTADO</th>
                        <th>GESTION</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_par}>
                            <td>{dato.id_par}</td>
                            <td>{dato.nom_par}</td>
                            <td>{dato.distritosModel.nom_dis}</td>
                            <td>{dato.latitud} {dato.latitud & dato.longitud ? "," : "No hay coordenadas registradas"} {dato.longitud}  </td>
                            <td>{dato.est_par ? "Habilitado" : "Deshabilitado"}</td>
                            <td>
                                <BotonesDeGestion
                                    ide={`id_par`} estado={`est_par`} dato={dato} edit={edit}
                                    deshabilitar={deshabilitarparadero} habilitar={habilitarparadero}
                                />
                                <Button variant="info">
                                    <Link to={`/paraderoxmap/${dato.nom_par}/${dato.longitud}/${dato.latitud}`}>
                                        <SiGooglemaps />Ver en el mapa
                                    </Link>

                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ParaderosModal
                show={showModal || abrir}
                close={closeModal}
                agregar={agregarDistrito}
                datosaeditar={datosEdit}
                editar={editarDistritos}
            />
        </>
    );
}