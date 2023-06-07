import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

export function DistritoTabla({url}){

    const[datos,setDatos] = useState([]);

    const ListarDatos = useCallback(async() => {
        const results = await axios.get(url);
        setDatos(results.data);
    },[url]);

    useEffect(()=>{
        ListarDatos();
    },[ListarDatos]);

    return(
        <>
            <Table striped bordered hover>
                <thead>
                    <th>ID</th>
                    <th>NOMBRE DEL DISTRITO</th>
                    <th>ESTADO</th>
                    <th>GESTION</th>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_dis}>
                            <td>{dato.id_dis}</td>
                            <td>{dato.nom_dis}</td>
                            <td>{dato.est_dis ? "Habilitado":"Deshabilitado"}</td>
                            <td>
                                <Button variant="success" >Editar</Button>
                                <Button
                                    variant={dato.est_dis ? "warning" : "primary"}
                                    onClick={() => {
                                        if (dato.est_dis) {

                                        } else {

                                        }
                                    }}
                                >
                                    {dato.est_dis ? "Deshabilitar" : "Habilitar"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}