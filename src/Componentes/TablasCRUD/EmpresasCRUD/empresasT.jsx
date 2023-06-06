import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { EmpresaModal } from "./empresaModal";


export function EmpresasT(){
    const [datos,setDatos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [datosEdit,setDatosEdit] = useState(null);

    const ListarDatos = useCallback(async() => {
        const results = await axios.get('http://localhost:8080/api/empresa');
        setDatos(results.data);
    },[]);

    useEffect(() => {
        ListarDatos();
    }, [ListarDatos]);

    const agregarEmpresa = (empresa) => {
        axios.post('http://localhost:8080/api/empresa', empresa)
        .then(()=>{
            closeModal();
            ListarDatos();
        })
    };

    const editarEmpresa = (empresa) => {
        console.log(empresa)
        axios.put(`http://localhost:8080/api/empresa/${empresa.id_emp}`, empresa)
        .then(()=>{
            closeModal();
            ListarDatos();
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const habilitarEmpresa = (id) => {
        axios
          .get(`http://localhost:8080/api/empresa/${id}`)
          .then((response) => {
            const empresa = response.data;
            empresa.est_emp = true;
            axios
              .put(`http://localhost:8080/api/empresa/${id}`, empresa)
              .then(() => {
                ListarDatos();
              });
          });
      };

    const deshabilitarEmpresa = (id) => {
        axios
          .get(`http://localhost:8080/api/empresa/${id}`)
          .then((response) => {
            const empresa = response.data;
            empresa.est_emp = false;
            axios
              .put(`http://localhost:8080/api/empresa/${id}`, empresa)
              .then(() => {
                ListarDatos();
              });
          });
      };

    const edit = (empresa) =>{
        setDatosEdit(empresa);
        setShowModal(true);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    return(
        <>
            <Button variant='success' onClick={openModal}>+</Button>
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
                                    <Button variant="success" onClick={() => edit(dato)}>Editar</Button>
                                    <Button variant="primary" onClick={() => habilitarEmpresa (dato.id_emp)}>Habilitar</Button>
                                    <Button variant="warning" onClick={() => deshabilitarEmpresa (dato.id_emp)}>Deshabilitar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <EmpresaModal 
                    show={showModal}
                    close={closeModal}
                    agregar={agregarEmpresa}
                    datosaeditar={datosEdit}
                    editar={editarEmpresa}
                />
        </>
    )
}