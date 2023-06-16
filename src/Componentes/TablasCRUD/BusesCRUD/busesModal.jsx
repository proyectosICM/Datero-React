import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { BsFillBusFrontFill } from "react-icons/bs";
import { FaMapSigns, FaTruck, FaUser } from "react-icons/fa";
import { TfiCreditCard } from "react-icons/tfi";
import { InputSimple, PruebaInp, SelectCruzado, SelectCruzado2 } from "../../BarraNav/forms";


export function BusesModal({ show, close, datosaeditar, editar, agregar, emp }) {

    const [trabajadores, setTrabajadores] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [editando, setEditando] = useState(false);


    const ListarTrabajadores = useCallback(async () => {
        const response = await axios.get(`http://localhost:8080/api/trabajadores/trabajadoresxEmpR/${emp}/${1}/${2}`);
        setTrabajadores(response.data);
    }, [emp]);

    const ListarRutas = useCallback(async () => {
        const response = await axios.get(`http://localhost:8080/api/rutas/rutasXEmpH/${emp}`);
        setRutas(response.data);
    }, [emp]);

    const [formData, setFormData] = useState({
        mod_bus: "",
        placa_bus: "",
        est_bus: true,
        trabajadoresModel: 1,
        rutasModel: 1
    });


    useEffect(() => {
        if (datosaeditar) {
            setFormData({ ...datosaeditar });
            setEditando(true)
        } else {
            limpiar();
        }
        ListarTrabajadores();
        ListarRutas();
    }, [datosaeditar, ListarTrabajadores, ListarRutas])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editando) {
            const updatedFormData = { ...formData };
            if (
                updatedFormData.trabajadoresModel &&
                typeof updatedFormData.trabajadoresModel === "object" && updatedFormData.rutasModel &&
                typeof updatedFormData.rutasModel === "object"
            ) {
                updatedFormData.trabajadoresModel = updatedFormData.trabajadoresModel.id_tra;
                updatedFormData.rutasModel = updatedFormData.rutasModel.id_ruta;
            } else if (
                updatedFormData.rutasModel &&
                typeof updatedFormData.rutasModel === "object"
            ) {
                updatedFormData.rutasModel = updatedFormData.rutasModel.id_ruta;
            } else if (
                updatedFormData.trabajadoresModel &&
                typeof updatedFormData.trabajadoresModel === "object"
            ) {
                updatedFormData.trabajadoresModel = updatedFormData.trabajadoresModel.id_tra;
            }
            editar(updatedFormData);
            console.log(datosaeditar);
            limpiar();
        } else {
            agregar(formData);
            console.log(datosaeditar);
        }
        close();
        limpiar();
    }

    const limpiar = () => {
        setFormData({ placa_bus: "", mod_bus: "", est_bus: true, trabajadoresModel: null, rutasModel: null });
        //setFormData({ placa_bus: "", mod_bus: "", est_bus: true, trabajadoresModel:null, rutasModel:null });
        setEditando(false);
    }


    return (
        <div>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title><BsFillBusFrontFill /> Agregar Buses</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <SelectCruzado
                                val={formData.rutasModel ? formData.rutasModel.id_ruta : ""}
                                namer={formData.rutasModel ? formData.rutasModel.nom_ruta : "Seleccione una ruta"}
                                onChan={(e) => {
                                    const selectedId = e.target.value;
                                    setFormData({ ...formData, rutasModel: selectedId });
                                }}
                                arr={rutas}
                                idField="id_ruta"
                                displayField="nom_ruta"
                            />

                            <InputSimple label="Modelo" setDatos={setFormData} val={formData.mod_bus}
                                onChan={(e) => setFormData({ ...formData, mod_bus: e.target.value })}
                            />



                        </div>

                        <div className="form-row">
                            <InputSimple label="Placa" setDatos={setFormData} val={formData.placa_bus}
                                onChan={(e) => setFormData({ ...formData, placa_bus: e.target.value })}
                            />


                            <Form.Group className="form-group-half">
                                <Form.Label><FaUser /> Conductor</Form.Label>
                                <Form.Select
                                    name="conductor"
                                    value={formData.trabajadoresModel ? formData.trabajadoresModel.id_tra : ""}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        setFormData({ ...formData, trabajadoresModel: selectedId });
                                    }}
                                >
                                    <option value={formData.trabajadoresModel ? formData.trabajadoresModel.id_tra : ""}>
                                        {formData.trabajadoresModel ? formData.trabajadoresModel.nom_tra + " " + formData.trabajadoresModel.ape_tra
                                            : "Seleccione una ruta"}
                                    </option>
                                    {trabajadores.map((trabajador) => (
                                        <option key={trabajador.id_tra} value={trabajador.id_tra}>
                                            {trabajador.nom_tra} {trabajador.ape_tra}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </div>



                        <Button type="submit">Crear</Button>
                        <Button onClick={close}>Cerrar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}