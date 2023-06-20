import React from "react";
import { Table } from "react-bootstrap";
import { TfiCreditCard } from "react-icons/tfi";
import { SiGooglemaps } from "react-icons/si";
import { BiTimeFive } from "react-icons/bi"
 
export function RegistrosTabla() {
    return ( 
        <div>
            <div className="tabla">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th><TfiCreditCard /> Placa</th>
                            <th><SiGooglemaps />Paradero</th>
                            <th><BiTimeFive /> Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ABC-456</td>
                            <td>Pte Atocongo</td>
                            <td>08:05</td>
                        </tr>
                        <tr>
                            <td>ABC-456</td>
                            <td>Primavera</td>
                            <td>08:35</td>
                        </tr>
                        <tr>
                            <td>ABC-456</td>
                            <td>Pte Santa Anita</td>
                            <td>09:12</td>
                        </tr>
                        <tr>
                            <td>ABC-456</td>
                            <td>Pte Nuevo</td>
                            <td>09:24</td>
                        </tr>
                        <tr>
                            <td>ABC-456</td>
                            <td>Acho</td>
                            <td>09:41</td>
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