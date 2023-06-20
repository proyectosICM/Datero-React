import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { TrabajadorModal } from "./trabajadorModal";
import { BotonesDeGestion } from "../../Common/botonesDeGestion";
import { agregarElemento, deshabilitarElemento, editarElemento, habilitarElemento } from "../../API/apiCRUD";
import { trabajadorURL } from "../../API/apiurls";

export function TrabajadorTabla({ url, il, abrir, cerrar }) {

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

    const agregarTrabajador = (trabajador) => {
        const requestData = {
            nom_tra: trabajador.nom_tra,
            ape_tra: trabajador.ape_tra,
            dni_tra: trabajador.dni_tra,
            user_tra: trabajador.user_tra,
            pass_tra: trabajador.pass_tra,
            empresasModel: {
                id_emp: il
            },
            rolesModel: {
                id_rol: trabajador.rolesModel
            },
            est_tra: trabajador.est_tra
        };
        agregarElemento(trabajadorURL, requestData, closeModal, ListarDatos);
    };

    const editarTrabajador = (trabajador) => {
        const requestData = {
            nom_tra: trabajador.nom_tra,
            ape_tra: trabajador.ape_tra,
            dni_tra: trabajador.dni_tra,
            user_tra: trabajador.user_tra,
            pass_tra: trabajador.pass_tra,
            empresasModel: {
                id_emp: il
            },
            rolesModel: {
                id_rol: trabajador.rolesModel
            },
            est_tra: trabajador.est_tra
        };
        const apiurledit = `${trabajadorURL}/${trabajador.id_tra}`;
        editarElemento(apiurledit, requestData, closeModal, ListarDatos);
    };

    const habilitarTrabajador = (id) => {
        habilitarElemento(trabajadorURL, id, `est_tra`, ListarDatos);
    };

    const deshabilitarTrabajador = (id) => {
        deshabilitarElemento(trabajadorURL, id, `est_tra`, ListarDatos);
    };



    const edit = (trabajador) => {
        setDatosEdit(trabajador);
        setShowModal(true);
    }


    const closeModal = () => {
        cerrar();
        setShowModal(false);
        setDatosEdit(null);
    };

    return (
        <>
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
                                <BotonesDeGestion
                                    ide={`id_tra`} estado={`est_tra`} dato={dato} edit={edit}
                                    deshabilitar={deshabilitarTrabajador} habilitar={habilitarTrabajador}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <TrabajadorModal
                show={showModal || abrir}
                close={closeModal}
                agregar={agregarTrabajador}
                datosaeditar={datosEdit}
                editar={editarTrabajador}
                il={il}
            />
        </>
    );
}