import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Estilos/barnavP.css';
import logo from '../../Imagenes/logo_icm3.png';
import { AiFillSetting } from 'react-icons/ai'

export function NavbarP(){
    return(
        <div>
            <Navbar bg="dark" variant="dark" className="navbar-container">
                <Container className="navbar-container">
                    <Navbar.Brand className="logo">
                        <Link to='/' className="linkes">
                            <img src={logo} alt="Logo Inicio" className="imgl"/>
                            <span>Inicio</span>
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto barra">
                        <Link to='/login' className="linkes">INICIO DE SESION</Link>
                        <Link to='/listvehiculos' className="linkes">LISTADO DE VEHICULOS</Link>
                        <Link to='/monitoreo' className="linkes">TABLA DE MONITOREO</Link>
                        <Link to='/prueba2' className="linkes">MAPA DE MONITOREO</Link>
                        <Link to='/registros' className="linkes">REGISTROS</Link>
                        <Link to='/menuCRUD' className="linkes"><AiFillSetting></AiFillSetting></Link>
                    </Nav>        
                </Container>
            </Navbar>
        </div>
    );
}