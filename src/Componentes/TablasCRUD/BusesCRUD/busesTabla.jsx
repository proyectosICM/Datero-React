import axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { BusesModal } from "./busesModal";
import { busesURL } from "../../API/apiurls";
import { agregarElemento, deshabilitarElemento, editarElemento, habilitarElemento } from "../../API/apiCRUD";
import { BotonesDeGestion } from "../../Common/botonesDeGestion";


export function BusesTabla({ il, url, abrir, cerrar }) {

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

    const agregarBus = (bus) => {
        console.log(bus);
        const requestData = {
            mod_bus: bus.mod_bus,
            placa_bus: bus.placa_bus,
            est_bus: bus.est_bus,
            trabajadoresModel: {
                id_tra: bus.trabajadoresModel
            },
            empresasModel: {
                id_emp: il
            },
            rutasModel: {
                id_ruta: bus.rutasModel
            }
        };

        agregarElemento(busesURL, requestData, closeModal, ListarDatos);
    };

    const editarBus = (bus) => {
        const requestData = {
            mod_bus: bus.mod_bus,
            placa_bus: bus.placa_bus,
            est_bus: bus.est_bus,
            trabajadoresModel: {
                id_tra: bus.trabajadoresModel
            },
            empresasModel: {
                id_emp: il
            },
            rutasModel: {
                id_ruta: bus.rutasModel
            }
        };
        const apiurledit = `${busesURL}/${bus.id_bus}`;
        editarElemento(apiurledit, requestData, closeModal, ListarDatos);
    };

    const habilitarBus = (id) => {
        habilitarElemento(busesURL, id, `est_bus`, ListarDatos);
    };

    const deshabilitarBus = (id) => {
        deshabilitarElemento(busesURL, id, `est_bus`, ListarDatos);
    };

    const edit = (bus) => {
        setDatosEdit(bus);
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
                        <th>Ruta</th>
                        <th>PLACA</th>
                        <th>MODELO</th>
                        <th>CONDUCTOR</th>
                        <th>EMPRESA</th>
                        <th>ESTADO</th>
                        <th>ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_bus}>
                            <td>{dato.id_bus}</td>
                            <td>{dato.rutasModel.nom_ruta}</td>
                            <td>{dato.placa_bus}</td>
                            <td>{dato.mod_bus}</td>
                            <td>{dato.trabajadoresModel.nom_tra}  {dato.trabajadoresModel.ape_tra}</td>
                            <td>{dato.empresasModel.nom_emp}</td>
                            <td>{dato.est_bus ? "Habilitado" : "Deshabilitado"}</td>
                            <td>
                                <BotonesDeGestion
                                    ide={`id_bus`} estado={`est_bus`} dato={dato} edit={edit}
                                    deshabilitar={deshabilitarBus} habilitar={habilitarBus}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table >
            <BusesModal
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