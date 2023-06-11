import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { TrabajadorModal } from "./trabajadorModal";

export function TrabajadorTabla({url, il}){

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
        console.log(trabajador)
        const requestData = {
            nom_tra: trabajador.nom_tra,
            ape_tra: trabajador.ape_tra,
            dni_tra: trabajador.dni_tra,
            empresasModel: {
              id_emp: trabajador.empresasModel
            },
            user_tra: trabajador.user_tra,
            pass_tra: trabajador.pass_tra,
            rolesModel: {
                id_emp: trabajador.rolesModel
            },
            est_tra: trabajador.est_tra
          };
        axios.post('http://localhost:8080/api/trabajadores', requestData)
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
            .get(`http://localhost:8080/api/trabajadores/${id}`)
            .then((response) => {
                const trabajador = response.data;
                trabajador.est_tra = true;
                
                axios
                    .put(`http://localhost:8080/api/trabajadores/${id}`, trabajador)
                    .then(() => {
                        ListarDatos();
                    });
            })
    };

    const deshabilitarTrabajador = (id) => {
        axios
            .get(`http://localhost:8080/api/trabajadores/${id}`)
            .then((response) => {
                const trabajador = response.data;
                trabajador.est_tra = false;
                axios
                    .put(`http://localhost:8080/api/trabajadores/${id}`, trabajador)
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
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>DNI</th>
                        <th>EMPRESA</th>
                        <th>NOMBRE DE USUARIO</th>
                        <th>CONTRASEÑA</th>
                        <th>ESTADO</th>
                        <th>ROL</th>
                        <th>GESTION</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_tra}>
                            <td>{dato.id_tra}</td>
                            <td>{dato.nom_tra} {dato.ape_tra}</td>
                            <td>{dato.dni_tra}</td>
                            <td>{dato.empresasModel.nom_emp}</td>
                            <td>{dato.user_tra}</td>
                            <td>{dato.pass_tra}</td>
                            <td>{dato.rolesModel.nom_rol}</td>
                            <td>{dato.est_tra ? "Habilitado" : "Deshabilitado"}</td>
                            <td>
                                <Button variant="success" onClick={() => edit(dato)}>Editar</Button>
                                <Button
                                    variant={dato.est_tra ? "warning" : "primary"}
                                    onClick={() => {
                                        if (dato.est_tra) {
                                            deshabilitarTrabajador(dato.id_tra);
                                        } else {
                                            habilitarTrabajador(dato.id_tra);
                                        }
                                    }}
                                >
                                    {dato.est_tra ? "Deshabilitar" : "Habilitar"}
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
                il={il}
            />
        </>
    );
}