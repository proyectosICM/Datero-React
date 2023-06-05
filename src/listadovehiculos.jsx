import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";


export function ListadoVehiculos(){

    const [datos, setDatos] = useState([]);

    const ListDatos = async () => {
        const results = await axios.get("http://localhost:8080/api/buses/vista");
        setDatos(results.data);
        console.log(datos);
    };

    useEffect(() => {
        ListDatos();
        console.log();
    }, []);

    return(
        <div className="container-registros">
            <h1>Listado de Vehiculos</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>RUTA</th>
                        <th>PLACA</th>
                        <th>MODELO</th>
                        <th>CONDUCTOR</th>
                        <th>EMPRESA</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_bus}>
                            <td>{dato.rutasModel.nom_ruta}</td>
                            <td>{dato.placa_bus}</td>
                            <td>{dato.mod_bus}</td>
                            <td>{dato.trabajadoresModel.nom_tra} {dato.trabajadoresModel.ape_tra}</td>
                            <td>{dato.empresasModel.nom_emp}</td>
                        </tr>
                    ))}

             
                </tbody>
            </Table>
        </div>
    );
}