import axios from "axios";
import { Button } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ParaderoXRutaModal } from "./paraderoXRutaModal";
import { BsArrowUpCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";

export function ParaderoXRutaTabla() {
    const [datos, setDatos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [datosEdit, setDatosEdit] = useState(null);

    const { ruta } = useParams();
    const ListarDatos = useCallback(async () => {
        const results = await axios.get(`http://localhost:8080/api/rp/rxp/${ruta}`);
        setDatos(results.data);
    }, [ruta]);

    useEffect(() => {
        ListarDatos();
    }, [ListarDatos]);


    const agregarParaderoXRuta = (pr) => {
        console.log(pr);
        const requestData = {
            orden_rp: 1,
            rutasModel: {
                id_ruta: ruta,
            },
            paraderosModel: {
                id_par: pr.paraderosModel
            },
            "est_rp": true
        };

        console.log(requestData);
        axios.post('http://localhost:8080/api/rp', requestData)
            .then(() => {
                closeModal();
                ListarDatos();
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const editarParaderoXRuta = (pr) => {
        const requestData = {
            orden_rp: 1,
            rutasModel: {
                id_ruta: ruta,
            },
            paraderosModel: {
                id_par: pr.paraderosModel
            },
            "est_rp": true
        };

        console.log(pr);
        console.log(requestData);
        axios.put(`http://localhost:8080/api/rp/${pr.id_rp}`, requestData)
            .then(() => {
                closeModal();
                ListarDatos();
            })
            .catch((error) => {
                console.log(error);
                console.log(error.response);
            })
    };

    const habilitarRP = (id) => {
        axios
            .get(`http://localhost:8080/api/rp/${id}`)
            .then((response) => {
                const rp = response.data;
                rp.est_rp = true;
                axios
                    .put(`http://localhost:8080/api/rp/${id}`, rp)
                    .then(() => {
                        ListarDatos();
                    });
            })
    };

    const deshabilitarRP = (id) => {
        axios
            .get(`http://localhost:8080/api/rp/${id}`)
            .then((response) => {
                const rp = response.data;
                rp.est_rp = false;
                axios
                    .put(`http://localhost:8080/api/rp/${id}`, rp)
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
            <div>
                <h1>RUTA {datos.length ? datos[0].rutasModel.nom_ruta : "Cargando datos"}</h1>
                <h2>
                    {datos.length ? datos[0].paraderosModel.distritosModel.nom_dis + " - " + datos[datos.length - 1].paraderosModel.distritosModel.nom_dis
                        : "Cargando Datos"}
                </h2>
                <Button variant="success" onClick={openModal}>Crear</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ORDEN</th>
                        <th>NOMBRE DE LA RUTA</th>
                        <th>NOMBRE DEL PARADERO</th>
                        <th>DISTRITO</th>
                        <th>GESTION</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_rp}>
                            <td>{dato.orden_rp}</td>
                            <td>{dato.rutasModel.nom_ruta}</td>
                            <td>{dato.paraderosModel.nom_par}</td>
                            <td>{dato.paraderosModel.distritosModel.nom_dis}</td>
                            <td>
                                <Button onClick={() => edit(dato)}>Editar</Button>
                                <Button
                                    variant={dato.est_rp ? "warning" : "primary"}
                                    onClick={() => {
                                        if (dato.est_rp) {
                                            deshabilitarRP(dato.id_rp);
                                        } else {
                                            habilitarRP(dato.id_rp);
                                        }
                                    }}
                                >
                                    {dato.est_rp ? "Deshabilitar" : "Habilitar"}
                                </Button>
                                <Button variant='success'>
                                    <BsArrowUpCircleFill /> 
                                </Button>
                                <Button variant="danger">
                                    <BsFillArrowDownCircleFill />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ParaderoXRutaModal
                show={showModal}
                close={closeModal}
                agregar={agregarParaderoXRuta}
                datosaeditar={datosEdit}
                editar={editarParaderoXRuta}
            />
        </div>
    );
}