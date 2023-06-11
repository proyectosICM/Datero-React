import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { RutasModal } from "./rutasModal";

export function RutasTabla({ url, il }) {

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


    const agregarBus = (ruta) => {
        console.log(ruta);
        const requestData = {
            nom_ruta: ruta.nom_ruta,
            est_ruta: ruta.est_ruta,
            empresasModel: {
                id_emp: ruta.empresasModel
            }
        };
        axios.post('http://localhost:8080/api/rutas', requestData)
            .then(() => {
                closeModal();
                ListarDatos();
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const editarBus = (ruta) => {
        const requestData = {
            nom_ruta: ruta.nom_ruta,
            est_ruta: ruta.est_ruta,
            empresasModel: {
                id_emp: ruta.empresasModel
            }
        };

        axios.put(`http://localhost:8080/api/rutas/${ruta.id_bus}`, requestData)
            .then(() => {
                closeModal();
                ListarDatos();
            })
            .catch((error) => {
                console.log(error);
                console.log(error.response);
            })
    };

    const habilitarRuta = (id) => {
        axios.get(`http://localhost:8080/api/rutas/${id}`)
            .then((response) => {
                const rutas = response.data;
                rutas.est_ruta = true;
                axios
                    .put(`http://localhost:8080/api/rutas/${id}`, rutas)
                    .then(() => {
                        ListarDatos();
                    });
            });
    };

    const deshabilitarRuta = (id) => {
        axios.get(`http://localhost:8080/api/rutas/${id}`)
            .then((response) => {
                const rutas = response.data;
                rutas.est_ruta = false;
                axios
                    .put(`http://localhost:8080/api/rutas/${id}`, rutas)
                    .then(() => {
                        ListarDatos();
                    });
            });
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
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE DE LA RUTA</th>
                        <th>EMPRESA</th>
                        <th>ESTADO</th>
                        <th>GESTION</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_ruta}>
                            <td>{dato.id_ruta}</td>
                            <td>{dato.nom_ruta}</td>
                            <td>{dato.empresasModel.nom_emp}</td>
                            <td>{dato.est_ruta ? "Habilitada" : "Deshabilitada"}</td>
                            <td>
                                <Button variant="success" >Editar</Button>
                                <Button
                                    variant={dato.est_ruta ? "warning" : "primary"}
                                    onClick={() => {
                                        if (dato.est_ruta) {
                                            deshabilitarRuta(dato.id_ruta)
                                        } else {
                                            habilitarRuta(dato.id_ruta)
                                        }
                                    }}
                                >
                                    {dato.est_ruta ? "Deshabilitar" : "Habilitar"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <RutasModal
                emp={il}
                show={showModal}
                close={closeModal}
                agregar={agregarBus}
                datosaeditar={datosEdit}
                editar={editarBus}
            />
        </>
    );
}