import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { EmpresaModal } from "./empresaModal";
import { BotonesDeGestion } from "../../Common/botonesDeGestion";
import { empresasURL } from "../../API/apiurls";
import { agregarElemento, deshabilitarElemento, editarElemento, habilitarElemento } from "../../API/apiCRUD";


export function EmpresasTabla({ url, abrir, cerrar }) {
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

    const agregarEmpresa = (empresa) => {
        agregarElemento(empresasURL, empresa, closeModal, ListarDatos);
    };

    const editarEmpresa = (empresa) => {
        const apiurledit = `${empresasURL}/${empresa.id_emp}`;
        editarElemento(apiurledit, empresa, closeModal, ListarDatos);
    };


    const habilitarEmpresa = (id) => {
        habilitarElemento(empresasURL, id, `est_emp`, ListarDatos);
    };


    const deshabilitarEmpresa = (id) => {
        deshabilitarElemento(empresasURL, id, `est_emp`, ListarDatos);
    };

    const edit = (empresa) => {
        setDatosEdit(empresa);
        setShowModal(true);
    };


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
                        <th>ESTADO</th>
                        <th>GESTION</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_emp}>
                            <td>{dato.id_emp}</td>
                            <td>{dato.nom_emp}</td>
                            <td>{dato.est_emp ? "Habilitado" : "Deshabilitado"}</td>
                            <td>
                                <BotonesDeGestion
                                    ide={`id_emp`} estado={`est_emp`} dato={dato} edit={edit}
                                    deshabilitar={deshabilitarEmpresa} habilitar={habilitarEmpresa}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EmpresaModal
                show={showModal || abrir}
                close={closeModal}
                agregar={agregarEmpresa}
                datosaeditar={datosEdit}
                editar={editarEmpresa}
            />
        </>
    )
}