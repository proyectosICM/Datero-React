import axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { BusesModal } from "./busesModal";


export function BusesTabla({il, url}) {

    const [datos, setDatos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [datosEdit, setDatosEdit] = useState(null);
    
    const ListarDatos = useCallback(async()=>{
        const results = await axios.get(url);
        setDatos(results.data);
    },[url]);

    useEffect(()=> {
        ListarDatos();
    },[ListarDatos]);

    const agregarBus = (bus) => {
        console.log(bus);
        const requestData = {
            mod_bus: bus.mod_bus,
            placa_bus: bus.placa_bus,
            est_bus: bus.est_bus,
            trabajadoresModel: {
              id_tra: bus.trabajadoresModel.id_tra
            },
            empresasModel: {
              id_emp: bus.empresasModel.id_emp,
            },
            rutasModel: {
              id_ruta: bus.rutasModel.id_ruta,
            }
          };

        axios.post('http://localhost:8080/api/buses', requestData)
        .then(()=>{
            closeModal();
            ListarDatos();
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const editarBus = (bus) => {
        axios.put(`http://localhost:8080/api/buses/${bus.id_bus}`, bus)
        .then(()=>{
            closeModal();
            ListarDatos();
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const habilitarBus = (id) => {
        axios
            .get(`http://localhost:8080/api/buses/${id}`)
            .then((response) => {
                const buses = response.data;
                buses.est_bus = true;
                axios
                    .put(`http://localhost:8080/api/buses/${id}`, buses)
                    .then(() => {
                        ListarDatos();
                    });
            })
    };

    const deshabilitarBus = (id) => {
        axios
            .get(`http://localhost:8080/api/buses/${id}`)
            .then((response) => {
                const buses = response.data;
                buses.est_bus = false;
                axios
                    .put(`http://localhost:8080/api/buses/${id}`, buses)
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
        <>
            <Button variant="success" onClick={openModal}> + </Button>
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
                            <td>{dato.est_bus ? "Habilitado":"Deshabilitado"}</td>
                            <td>
                                    <Button variant="success" onClick={()=> edit(dato)}>Editar</Button>
                                    <Button
                                    variant = {dato.est_bus ? "warning":"primary"}
                                    onClick={()=> {
                                        if(dato.est_bus){
                                            deshabilitarBus(dato.id_bus);
                                        } else {
                                            habilitarBus(dato.id_bus);
                                        }
                                    }}
                                    >
                                       {dato.est_bus ? "Deshabilitar" : "Habilitar"}
                                    </Button>
                                </td>
                        </tr> 
                    ))}
                </tbody>
            </Table>
            <BusesModal
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