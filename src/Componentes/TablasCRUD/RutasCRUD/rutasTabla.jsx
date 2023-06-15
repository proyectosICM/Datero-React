import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { RutasModal } from "./rutasModal";
import './styles/rutasTabla.css';
import { Link } from "react-router-dom";

export function RutasTabla({ url, il, abrir, cerrar }) {
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
        const requestData = {
            nom_ruta: ruta.nom_ruta,
            est_ruta: ruta.est_ruta,
            empresasModel: {
                id_emp: il,
            },
        };
        axios
            .post("http://localhost:8080/api/rutas", requestData)
            .then(() => {
                closeModal();
                ListarDatos();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editarBus = (ruta) => {
        const requestData = {
            nom_ruta: ruta.nom_ruta,
            est_ruta: ruta.est_ruta,
            empresasModel: {
                id_emp: il,
            },
        };

        axios
            .put(`http://localhost:8080/api/rutas/${ruta.id_ruta}`, requestData)
            .then(() => {
                closeModal();
                ListarDatos();
            })
            .catch((error) => {
                console.log(error);
                console.log(error.response);
            });
    };

    const habilitarRuta = (id) => {
        axios.get(`http://localhost:8080/api/rutas/${id}`).then((response) => {
            const rutas = response.data;
            rutas.est_ruta = true;
            axios.put(`http://localhost:8080/api/rutas/${id}`, rutas).then(() => {
                ListarDatos();
            });
        });
    };

    const deshabilitarRuta = (id) => {
        axios.get(`http://localhost:8080/api/rutas/${id}`).then((response) => {
            const rutas = response.data;
            rutas.est_ruta = false;
            axios.put(`http://localhost:8080/api/rutas/${id}`, rutas).then(() => {
                ListarDatos();
            });
        });
    };

    const edit = (bus) => {
        setDatosEdit(bus);
        setShowModal(true);
    };

    const closeModal = () => {
        cerrar();
        setShowModal(false);
    };



    return (
        <>


            <div className="card-container">
                {datos.map((dato) => (
                    <Card key={dato.id_ruta} className="custom-card">
                        <Card.Body>
                            <Card.Title>{dato.nom_ruta}</Card.Title>
                            <Card.Text>
                                <strong>Empresa:</strong> {dato.empresasModel.nom_emp}
                            </Card.Text>
                            <Card.Text>
                                <strong>Estado:</strong>{" "}
                                {dato.est_ruta ? "Habilitada" : "Deshabilitada"}
                            </Card.Text>

                            <div className="button-container">
                                <Button className="button" variant="success" onClick={() => edit(dato)}>
                                    Editar Nombre de Ruta
                                </Button>
                                <Button className="button" variant="success">
                                    <Link to={`/paraderoxruta/${dato.id_ruta}`}>Administrar Paraderos</Link>
                                </Button>
                                <Button className="button" variant="success" onClick={() => edit(dato)}>
                                    Ver ruta en el mapa
                                </Button>
                                <Button
                                    className="button"
                                    variant={dato.est_ruta ? "warning" : "primary"}
                                    onClick={() => {
                                        if (dato.est_ruta) {
                                            deshabilitarRuta(dato.id_ruta);
                                        } else {
                                            habilitarRuta(dato.id_ruta);
                                        }
                                    }}
                                >
                                    {dato.est_ruta ? "Deshabilitar" : "Habilitar"}
                                </Button>
                            </div>

                        </Card.Body>
                    </Card>
                ))}
            </div>
            <RutasModal
                emp={il}
                show={showModal || abrir}
                close={closeModal}
                agregar={agregarBus}
                datosaeditar={datosEdit}
                editar={editarBus}
            />
        </>
    );
}
