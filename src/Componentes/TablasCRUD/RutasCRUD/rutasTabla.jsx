import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

export function RutasTabla({url}){

    const [datos, setDatos] = useState([]);

    const ListarDatos = useCallback(async() => {
        const results = await axios.get(url);
        setDatos(results.data);
    },[url]);

    useEffect(()=>{
        ListarDatos();
    },[ListarDatos]);

    const habilitarRuta = (id) => {
        axios.get(`http://localhost:8080/api/rutas/${id}`)
            .then((response) => {
                const rutas = response.data;
                rutas.est_ruta = true;
                axios
                    .put(`http://localhost:8080/api/rutas/${id}`, rutas)
                    .then(() => {
                        ListarDatos();
                    });
            });
    };

    const deshabilitarRuta = (id) => {
        axios.get(`http://localhost:8080/api/rutas/${id}`)
            .then((response) => {
                const rutas = response.data;
                rutas.est_ruta = false;
                axios
                    .put(`http://localhost:8080/api/rutas/${id}`, rutas)
                    .then(() => {
                        ListarDatos();
                    });
            });
    };

    return(
        <>
            <Table striped bordered hover>
                <thead>
                    <th>ID</th>
                    <th>NOMBRE DE LA RUTA</th>
                    <th>EMPRESA</th>
                    <th>ESTADO</th>
                    <th>GESTION</th>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_ruta}>
                            <td>{dato.id_ruta}</td>
                            <td>{dato.nom_ruta}</td>
                            <td>{dato.empresasModel.nom_emp}</td>
                            <td>{dato.est_ruta ? "Habilitada":"Deshabilitada"}</td>
                            <td>
                                <Button variant="success" >Editar</Button>
                                <Button
                                    variant={dato.est_ruta ? "warning" : "primary"}
                                    onClick={() => {
                                        if (dato.est_ruta) {
                                            deshabilitarRuta(dato.id_ruta)
                                        } else {
                                            habilitarRuta(dato.id_ruta)
                                        }
                                    }}
                                >
                                    {dato.est_ruta ? "Deshabilitar" : "Habilitar"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}