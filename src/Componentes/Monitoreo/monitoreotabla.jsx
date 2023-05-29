import React from "react";
import '../../Estilos/monitoreotabla.css'
import { Table } from "react-bootstrap";
import datos from '../../Datos-Simulados/rutas.json';

export function MonitoreoTabla(){
    const ida = datos.monitoreo.filter(item => item.direccion === "IDA");

    return(
        <div className="container-montabla">
            <h1>{ida.length > 0 ? ida[0].direccion: ""}</h1>
            <div className="ruta">
                <h5>Ate</h5>
                <h5>→</h5>
                <h5>San Miguel</h5>
            </div>
            <div className="tabla">
                <Table striped bordered hover>
                    <thead>
                        <th>PLACA</th>
                        <th>TIEMPO</th>
                    </thead>
                    <tbody>
                        {ida.map((item) => (
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