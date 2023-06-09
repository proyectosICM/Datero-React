import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { TrabajadorModal } from "./trabajadorModal";

export function TrabajadorTabla({url}){

    const [datos, setDatos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [datosEdit, setDatosEdit] = useState(null);

    const ListarDatos = useCallback(async () => {
        const results = await axios.get(url);
        setDatos(results.data);
    },[url]);

    useEffect(() => {
        ListarDatos();
    },[ListarDatos]);

    const agregarTrabajador = (trabajador) => {
        axios.post('http://localhost:8080/api/trabajador/', trabajador)
        .then(()=>{
            closeModal();
            ListarDatos();
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const editarTrabajador = (trabajador) => {
        axios.put(`http://localhost:8080/api/trabajador/${trabajador.id_bus}`, trabajador)
        .then(()=>{
            closeModal();
            ListarDatos();
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const habilitarTrabajador = (id) => {
        axios
            .get(`http://localhost:8080/api/trabajador/${id}`)
            .then((response) => {
                const trabajador = response.data;
                trabajador.usuariosModel.est_usu = true;
                
                axios
                    .put(`http://localhost:8080/api/trabajador/${id}`, trabajador)
                    .then(() => {
                        ListarDatos();
                    });
            })
    };

    const deshabilitarTrabajador = (id) => {
        axios
            .get(`http://localhost:8080/api/trabajador/${id}`)
            .then((response) => {
                const trabajador = response.data;
                trabajador.usuariosModel.est_usu = false;
                axios
                    .put(`http://localhost:8080/api/trabajador/${id}`, trabajador)
                    .then(() => {
                        ListarDatos();
                    });
            })
    };



    const edit = (trabajador) => {
        setDatosEdit(trabajador);
        setShowModal(true);
    }

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return(
        <>
            <Button variant="success" onClick={openModal}> + </Button>
            <Table striped bordered hover>
                <thead>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>DNI</th>
                    <th>EMPRESA</th>
                    <th>NOMBRE DE USUARIO</th>
                    <th>CONTRASEÑA</th>
                    <th>ESTADO</th>
                    <th>GESTION</th>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_tra}>
                            <td>{dato.id_tra}</td>
                            <td>{dato.nom_tra} {dato.ape_tra}</td>
                            <td>{dato.dni_tra}</td>
                            <td>{dato.empresasModel.nom_emp}</td>
                            <td>{dato.usuariosModel.user_usu}</td>
                            <td>{dato.usuariosModel.pass_usu}</td>
                            <td>{dato.usuariosModel.est_usu ? "Habilitado" : "Deshabilitado"}</td>
                            <td>
                                <Button variant="success" onClick={() => edit}>Editar</Button>
                                <Button
                                    variant={dato.usuariosModel.est_usu ? "warning" : "primary"}
                                    onClick={() => {
                                        if (dato.usuariosModel.est_usu) {
                                            deshabilitarTrabajador(dato.id_bus);
                                        } else {
                                            habilitarTrabajador(dato.id_bus);
                                        }
                                    }}
                                >
                                    {dato.usuariosModel.est_usu ? "Deshabilitar" : "Habilitar"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <TrabajadorModal
                show={showModal}
                close={closeModal}
                agregar={agregarTrabajador}
                datosaeditar={datosEdit}
                editar={editarTrabajador}
            />
        </>
    );
}