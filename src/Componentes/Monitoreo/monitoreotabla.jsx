import React from "react";
import '../../Estilos/monitoreotabla.css'
import { Table } from "react-bootstrap";
import datos from '../../Datos-Simulados/rutas.json';

export function MonitoreoTabla({dir,rut}){
    const idir = datos.monitoreo.filter(item => item.direccion === dir);

    return(
        <div className="container-montabla">
            <h1>{idir.length > 0 ? idir[0].direccion: ""}</h1>
            <div className="ruta">
                <h5>{idir.length > 0 ? idir[0].ruta: ""}</h5>
            </div>
            <div className="tabla">
                <Table striped bordered hover>
                    <thead>
                        <th>PLACA</th>
                        <th>TIEMPO</th>
                    </thead>
                    <tbody>
                        {idir.map((item) => (
                            <tr key={item.id}>
                                <td>{item.placa}</td>
                                <td>{item.tpruta}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

        </div>
    );
}