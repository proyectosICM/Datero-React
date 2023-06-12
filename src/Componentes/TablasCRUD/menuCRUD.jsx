import { Button } from "react-bootstrap";
import React from "react";
import { BsBuildingsFill } from 'react-icons/bs';
import { BsFillBusFrontFill } from 'react-icons/bs';
import { BsPersonVcard } from 'react-icons/bs';
import { FaMapSigns } from 'react-icons/fa';
import { TbBusStop } from 'react-icons/tb';
import { SiGooglemaps } from 'react-icons/si';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { Link } from "react-router-dom";

export function MenuCRUD(){

    const tablas = ["Empresas", "Buses", "Trabajadores", "Rutas", "Distritos", "Paraderos", "Roles de usuario"];
    const iconos = [BsBuildingsFill,BsFillBusFrontFill,BsPersonVcard,FaMapSigns,TbBusStop,SiGooglemaps, AiOutlineUserSwitch]
    const rutas = ['/empresasCRUD', '/menuBuses', '/trabajadoresCRUD', '/rutasCRUD', '/distritosCRUD', '/paraderosCRUD', '/rolesCRUD']
    return (
        <div className="container-crud">
            {tablas.map((tabla, index) => (
                <div className="imcrud">
                    <h1>Administrar {tabla}</h1>
                    <span>Crear, Editar y eliminar {tabla}</span>
                    <div>
                        {React.createElement(iconos[index], { className: "icon-class" })}
                    </div>
                    <Link to={`${rutas[index]}`}>
                        <Button className="btn-l">IR</Button>
                    </Link>

                </div>
            ))}

        </div>
    );
}