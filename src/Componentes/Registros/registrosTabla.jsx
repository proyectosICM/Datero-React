import React from "react";
import { Table } from "react-bootstrap";

export function RegistrosTabla(){
    return(
        <div>
            <div className="tabla">
                <Table triped bordered hover>
                    <thead>
                        <th>Placa</th>
                        <th>Paradero</th>
                        <th>Hora</th>
                    </thead>
                    <tbody id="table-3">
                            <tr>
                            <td id="cell-0-0">ABC-456</td>
                            <td id="cell-0-1">Pte Atocongo</td>
                            <td id="cell-0-2">08:05</td>
                            </tr>
                            <tr>
                            <td id="cell-1-0">ABC-456</td>
                            <td id="cell-1-1">Primavera</td>
                            <td id="cell-1-2">08:35</td>
                            </tr>
                            <tr>
                            <td id="cell-2-0">ABC-456</td>
                            <td id="cell-2-1">Pte Santa Anita</td>
                            <td id="cell-2-2">09:12</td>
                            </tr>
                            <tr>
                            <td id="cell-3-0">ABC-456</td>
                            <td id="cell-3-1">Pte Nuevo</td>
                            <td id="cell-3-2">09:24</td>
                            </tr>
                            <tr>
                            <td id="cell-4-0">ABC-456</td>
                            <td id="cell-4-1">Acho</td>
                            <td id="cell-4-2">09:41</td>
                            </tr>
                            <tr>
                            <td>ABC-456</td>
                            <td>Caqueta</td>
                            <td>09:53</td>
                            </tr>
                            <tr>
                            <td>ABC-456</td>
                            <td>Pza Norte</td>
                            <td>10:26</td>
                            </tr>
                            <tr>
                            <td>ABC-456</td>
                            <td>Naranjal</td>
                            <td>10:49</td>
                            </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}