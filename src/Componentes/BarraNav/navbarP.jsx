import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Estilos/barnavP.css';
import logo from '../../Imagenes/logo_icm3.png';

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
                        <Link to='/monitoreo' className="linkes">TABLA DE MONITOREO</Link>
                        <Link to='/prueba2' className="linkes">MAPA DE MONITOREO</Link>
                        <Link to='/prueba3' className="linkes">REGISTROS</Link>
                    </Nav>        
                </Container>
            </Navbar>
        </div>
    );
}