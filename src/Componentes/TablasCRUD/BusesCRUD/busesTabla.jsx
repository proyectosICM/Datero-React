import axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";


export function BusesTabla({il}) {

    const [datos, setDatos] = useState([]);
    const ListarDatos = useCallback(async()=>{
        const results = await axios.get(`http://localhost:8080/api/buses/busxemp/${il}`);
        setDatos(results.data);
    },[il]);

    useEffect(()=> {
        ListarDatos();
    },[ListarDatos]);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>PLACA</th>
                        <th>MODELO</th>
                        <th>CONDUCTOR</th>
                        <th>EMPRESA</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_bus}>
                            <td>{dato.id_bus}</td>
                            <td>{dato.placa_bus}</td>
                            <td>{dato.mod_bus}</td>
                            <td>{dato.trabajadoresModel.nom_tra}  {dato.trabajadoresModel.ape_tra}</td>
                            <td>{dato.empresasModel.nom_emp}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}