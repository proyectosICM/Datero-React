import axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";

export function BusesT(){

    const [datos, setDatos] = useState([]);
    /*
    const [showModal,setShowModal] = useState(true);
    const [datosEdit, setDatosEdit] = useState(null);
*/
    const ListarDatos = useCallback(async()=>{
        const results = await axios.get('http://localhost:8080/api/buses');
        setDatos(results.data);
    },[]);

    useEffect(()=> {
        ListarDatos();
    },[ListarDatos]);

    return(
        <div className="container-crud">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>PLACA</th>
                        <th>MODELO</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr>
                            <td>{dato.id_bus}</td>
                            <td>{dato.placa_bus}</td>
                            <td>{dato.mod_bus}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}