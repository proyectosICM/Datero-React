import React from "react";
import { Form, Button } from "react-bootstrap";
import "./login.css";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="login">
        <div className="login-form">
          <h1>Iniciar sesión</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu usuario" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingresa tu contraseña" />
            </Form.Group>

            <Button variant="primary" type="submit" className="login-button">
              Iniciar sesión
            </Button>
          </Form>
        </div>
        <div className="login-info">
          <h2>Datero: un proyecto de seguimiento GPS para tu empresa</h2>
          <Link>Contrarar</Link>
        </div>
    </div>
  );
}
