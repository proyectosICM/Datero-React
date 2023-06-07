import axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";


export function BusesTabla({il, url}) {

    const [datos, setDatos] = useState([]);
    
    const ListarDatos = useCallback(async()=>{
        const results = await axios.get(url);
        setDatos(results.data);
    },[url]);

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
                        <th>ESTADO</th>
                        <th>ESTADO</th>
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
                            <td>{dato.est_bus ? "Habilitado":"Deshabilitado"}</td>
                            <td>
                                    <Button variant="success" >Editar</Button>
                                    <Button
                                    variant = {dato.est_bus ? "warning":"primary"}
                                    onClick={()=> {
                                        if(dato.est_bus){

                                        } else {

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
        </>
    );
}