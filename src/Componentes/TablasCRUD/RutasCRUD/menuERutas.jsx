import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function MenuERutas(){

    const [datos, setDatos] = useState([]);

    const ListarDatos = useCallback(async() => {
        const results = await axios.get('http://localhost:8080/api/empresa/habilitadas');
        setDatos(results.data);
    },[]);

    useEffect(()=>{
        ListarDatos();
    },[ListarDatos])

    return (
        <div className="container-crud">
            {datos.map((dato) => (
                <div className="imcrud">
                    <h1>{dato.nom_emp} </h1>
                    <span>Ver todos los trabajadores</span>
                    <Link to={`/rutasxemp/${dato.id_emp}`}>
                        <Button>IR</Button>
                    </Link>

                </div>
            ))}
        </div>
    );
}