import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  BsFillPersonFill,
  BsPersonPlus,
  BsX,
} from "react-icons/bs";
import {
  HiOutlineIdentification,
  HiUserCircle,
} from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import "./trabajadorModal.css";

export function TrabajadorModal({
  show,
  close,
  datosaeditar,
  editar,
  agregar,
  il,
}) {
  const [formData, setFormData] = useState({
    nom_tra: "",
    ape_tra: "",
    dni_tra: "",
    empresasModel: il,
    user_tra: "",
    pass_tra: "",
    rolesModel: null,
    est_tra: true,
  });
  const [roles, setRoles] = useState([]);
  const [editando, setEditando] = useState(false);

  const ListarRoles = useCallback(async () => {
    const response = await axios.get(`http://localhost:8080/api/roles`);
    setRoles(response.data);
  }, []);

  useEffect(() => {
    if (datosaeditar) {
      setFormData({ ...datosaeditar });
      setEditando(true);
    } else {
      // ...
    }
    ListarRoles();
  }, [datosaeditar, ListarRoles]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editando) {
      const updatedFormData = { ...formData };
      if (
        updatedFormData.rolesModel &&
        typeof updatedFormData.rolesModel === "object"
      ) {
        updatedFormData.rolesModel = updatedFormData.rolesModel.id_rol;
      }
      editar(updatedFormData);
      limpiar();
    } else {
      agregar(formData);
    }
    close();
    limpiar();
  };
 
  const limpiar = () => {
    setFormData({
      nom_tra: "",
      ape_tra: "",
      dni_tra: "",
      empresasModel: il,
      user_tra: "",
      pass_tra: "",
      rolesModel: null,
      est_tra: true,
    });
    setEditando(false);
  };


  const handleClose = () => {
    if (datosaeditar) {
      limpiar();
    }
    close();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editando ? "Editar Trabajador" : "Agregar Trabajador"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="form-row">
              <Form.Group controlId="formNombre" className="form-group-half">
                <Form.Label>
                  <BsFillPersonFill className="label-icon" />
                  Nombre:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nom_tra"
                  placeholder="Nombre"
                  value={formData.nom_tra}
                  onChange={(e) =>
                    setFormData({ ...formData, nom_tra: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formApellido" className="form-group-half">
                <Form.Label>
                  <BsFillPersonFill className="label-icon" />
                  Apellido:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="ape_tra"
                  placeholder="Apellido"
                  value={formData.ape_tra}
                  onChange={(e) =>
                    setFormData({ ...formData, ape_tra: e.target.value })
                  }
                />
              </Form.Group>
            </div>

            <div className="form-row">
              <Form.Group controlId="formUsuario" className="form-group-half">
                <Form.Label>
                  <HiUserCircle className="label-icon" />
                  Usuario:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="user_tra"
                  placeholder="Usuario"
                  value={formData.user_tra}
                  onChange={(e) =>
                    setFormData({ ...formData, user_tra: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group
                controlId="formContrasena"
                className="form-group-half"
              >
                <Form.Label>
                  <MdOutlinePassword className="label-icon" />
                  Contraseña:
                </Form.Label>
                <Form.Control
                  type="password"
                  name="pass_tra"
                  placeholder="Contraseña"
                  value={formData.pass_tra}
                  onChange={(e) =>
                    setFormData({ ...formData, pass_tra: e.target.value })
                  }
                />
              </Form.Group>
            </div>

            <Form.Group controlId="formDNI">
              <Form.Label>
                <HiOutlineIdentification className="label-icon" />
                DNI:
              </Form.Label>
              <Form.Control
                type="text"
                name="dni_tra"
                placeholder="DNI"
                value={formData.dni_tra}
                onChange={(e) =>
                  setFormData({ ...formData, dni_tra: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formRol">
              <Form.Label>
                <BsPersonPlus className="label-icon" />
                Rol:
              </Form.Label>
              <Form.Select
                name="conductor"
                value={formData.rolesModel ? formData.rolesModel.id_rol : ""}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setFormData({ ...formData, rolesModel: selectedId });
                }}
              >
                <option value="">
                  {formData.rolesModel
                    ? formData.rolesModel.nom_rol
                    : "Seleccione un rol"}
                </option>
                {roles.map((rol) => (
                  <option key={rol.id_rol} value={rol.id_rol}>
                    {rol.nom_rol}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="modal-buttons">
              <Button type="submit">
                {editando ? "Guardar cambios" : "Crear"}
              </Button>
              <Button onClick={handleClose} variant='secondary'>
                <BsX className="button-icon" />
                Cerrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
