import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../../Imagenes/logo_icm3.png';
import { AiFillSetting, AiOutlineUser, AiOutlineCar, AiOutlineTable } from 'react-icons/ai';
import { SiGooglemaps } from 'react-icons/si';
import { FaClipboardList } from "react-icons/fa";
import './barnavP.css';

const NavbarP = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="navbar-container">
      <Container>
        <Navbar.Brand>
          <Link to='/' className="logo-link">
            <img src={logo} alt="Logo Inicio" className="logo-img" />
            <span className="logo-text">Inicio</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto barra">
            <Link to='/login' className="linkes">
              <AiOutlineUser className="link-icon" />
              INICIO DE SESIÓN
            </Link>
            <Link to='/listvehiculos' className="linkes">
              <AiOutlineCar className="link-icon" />
              LISTADO DE VEHÍCULOS
            </Link>
            <Link to='/monitoreo' className="linkes">
              <AiOutlineTable className="link-icon" />
              TABLA DE MONITOREO
            </Link>
            <Link to='/prueba2' className="linkes">
              <SiGooglemaps className="linkes" />
              MAPA DE MONITOREO
            </Link>
            <Link to='/registros' className="linkes">
              <FaClipboardList />
              REGISTROS
            </Link>
            <Link to='/menuCRUD' className="linkes">
              <AiFillSetting className="link-icon" />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarP;
