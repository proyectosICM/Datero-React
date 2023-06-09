import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './menuEParaderos.css';

export function MenuEParaderos() {
    const [datos, setDatos] = useState([]);

    const ListarDatos = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/empresa/habilitadas');
            setDatos(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        ListarDatos();
    }, [ListarDatos]);

    return (
        <div className="container-crud">
            {datos.map((dato, index) => (
                <Card className="crud-card" key={index}>
                    <Card.Body>
                        <Card.Title>{dato.nom_emp}</Card.Title>
                        <Card.Text>Ver las unidades</Card.Text>
                        <Link to={`/busesxemp/${dato.id_emp}`}>
                            <Button variant="primary" className="btn-l">IR</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}