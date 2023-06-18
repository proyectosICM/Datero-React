import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaMapMarkerAlt, FaTruck, FaUser, FaMapSigns } from "react-icons/fa";
import { BsBuildingsFill, BsBusFront } from "react-icons/bs";
import { TfiCreditCard } from "react-icons/tfi";
import { Link } from "react-router-dom";

export function ListadoVehiculos() {
  const [datos, setDatos] = useState([]);

  const ListDatos = useCallback(async () => {
    const results = await axios.get("http://localhost:8080/api/buses/vista");
    setDatos(results.data);
  }, []);

  useEffect(() => {
    ListDatos();
  }, [ListDatos]);

  return (
    <div className="container-registros">
      <h1><BsBusFront /> Listado de Vehículos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th><FaMapSigns />RUTA</th>
            <th><TfiCreditCard /> PLACA</th>
            <th><FaTruck /> MODELO</th>
            <th><FaUser className="icon" /> CONDUCTOR</th>
            <th><BsBuildingsFill className="icon" /> EMPRESA</th>
            <th><FaMapMarkerAlt className="icon" /> LATITUD</th>
            <th><FaMapMarkerAlt className="icon" /> LONGUITUD</th>
            <th><FaMapMarkerAlt className="icon" /> PARADERO MÁS PRÓXIMO</th>
            <th><FaMapMarkerAlt className="icon" /> VER UBICACION EN EL MAPA</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.id_bus}>
              <td>{dato.rutasModel.nom_ruta}</td>
              <td>{dato.placa_bus}</td>
              <td>{dato.mod_bus}</td>
              <td>
                {dato.trabajadoresModel.nom_tra} {dato.trabajadoresModel.ape_tra}
              </td>
              <td>
                {dato.empresasModel.nom_emp}
              </td>
              <td>
                {dato.latitud}
              </td>
              <td>
                {dato.longitud}
              </td>
              <td>
                <FaMapMarkerAlt className="icon" />
                {dato.paradero_mas_proximo}
              </td>
              <td>
                <Button>
                  <Link to={`/listadoBuses/${dato.id_bus}/${dato.rutasModel.id_ruta}`} className="linkes">
                    Ver
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
