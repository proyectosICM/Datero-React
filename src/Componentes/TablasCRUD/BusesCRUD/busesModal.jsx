import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal} from "react-bootstrap";


export function BusesModal({show, close,datosaeditar,editar,agregar, emp}){

    const [trabajadores, setTrabajadores] = useState([]);
    const [selectedTrabajador, setSelectedTrabajador] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [seletedRuta, setSeletedRuta] = useState([]);

    const ListarTrabajadores = useCallback(async() => {
        const trabajadores = await axios.get(`http://localhost:8080/api/trabajadores/trabajadoresxEmpR/${emp}/${1}/${2}`);
        setTrabajadores(trabajadores.data);
    },[emp]);

    const ListarRutas = useCallback(async() => {
        const rutas = await axios.get(`http://localhost:8080/api/rutas/rutasXEmpH/${emp}`);
        setRutas(rutas.data);
    },[emp]);

    const [formData,setFormData] = useState({
        mod_bus: "",
        placa_bus: "",
        est_bus: true,
        trabajadoresModel: {
            id_tra: selectedTrabajador
        },
        empresasModel: {
            id_emp: {emp}
        },
        rutasModel: {
            id_ruta: seletedRuta
        }
    });

    useEffect(()=>{
        if(datosaeditar){
            setFormData(datosaeditar);
        } else {

        }
        ListarTrabajadores();
        ListarRutas();
    },[datosaeditar, ListarTrabajadores, ListarRutas])

    const handleSubmit = (event) => {
        event.preventDefault();
        if(datosaeditar){
            editar(formData);
        } else {
            agregar(formData);
        }
        close();
        limpiar();
    }

    const limpiar = () => {
        setFormData({ placa_bus: "", mod_bus: "", est_bus: true });
    }

    return (
        <div>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Buses</Modal.Title>    
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Ruta</Form.Label>
                        <Form.Select 
                            value={seletedRuta}
                            name="ruta"
                            onChange={(e) => setSeletedRuta(e.target.value)}
                        >
                            {rutas.map((ruta) => (
                                <option key={ruta.id_ruta} value={ruta.id_ruta}>
                                    {ruta.nom_ruta}
                                </option>
                            ))}
                        </Form.Select>

                        <Form.Label>Modelo</Form.Label>
                        <Form.Control
                            type="text"
                            name="mod_bus"
                            placeholder="Modelo"
                            value={formData.mod_bus}
                            onChange={(e) => setFormData({ ...formData, mod_bus: e.target.value })}
                        />

                        <Form.Label>Placa</Form.Label>
                        <Form.Control
                            type="text"
                            name="placa_bus"
                            placeholder="Placa"
                            value={formData.placa_bus}
                            onChange={(e) => setFormData({ ...formData, placa_bus: e.target.value })}
                        />



                        <Form.Label>Conductor</Form.Label>
                        <Form.Select
                            value={selectedTrabajador}
                            onChange={(e) => setSelectedTrabajador(e.target.value)}
                        >
                            {trabajadores.map((trabajador) => (
                                <option key={trabajador.id_tra} value={trabajador.id_tra}>
                                    {trabajador.nom_tra} {trabajador.ape_tra}
                                </option>
                            ))}
                        </Form.Select>
                        <Button type="submit">Crear</Button>
                        <Button onClick={close}>Cerrar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}