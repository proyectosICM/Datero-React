import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

export function TrabajadorTabla({url}){

    const [datos, setDatos] = useState([])

    const ListarDatos = useCallback(async () => {
        const results = await axios.get(url);
        setDatos(results.data);
    },[url]);

    useEffect(() => {
        ListarDatos();
    },[ListarDatos]);

    return(
        <>
            <Table striped bordered hover>
                <thead>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>DNI</th>
                    <th>EMPRESA</th>
                    <th>NOMBRE DE USUARIO</th>
                    <th>CONTRASEÑA</th>
                    <th>ESTADO</th>
                    <th>GESTION</th>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_tra}>
                            <td>{dato.id_tra}</td>
                            <td>{dato.nom_tra} {dato.ape_tra}</td>
                            <td>{dato.dni_tra}</td>
                            <td>{dato.empresasModel.nom_emp}</td>
                            <td>{dato.usuariosModel.user_usu}</td>
                            <td>{dato.usuariosModel.pass_usu}</td>
                            <td>{dato.usuariosModel.est_usu ? "Habilitado" : "Deshabilitado"}</td>
                            <td>
                                <Button variant="success" >Editar</Button>
                                <Button
                                    variant={dato.usuariosModel.est_usu ? "warning" : "primary"}
                                    onClick={() => {
                                        if (dato.usuariosModel.est_usu) {

                                        } else {

                                        }
                                    }}
                                >
                                    {dato.usuariosModel.est_usu ? "Deshabilitar" : "Habilitar"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}