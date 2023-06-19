import React from 'react';
import { Button } from 'react-bootstrap';

const BusInfo = ({ bus, activador }) => {
  if (!bus) {
    return null;
  }

  return (
    <React.Fragment>
      <h1>Placa {bus.placa_bus}</h1>
      {bus.rutasModel && bus.rutasModel.id_ruta && (
        <h1>RUTA {bus.rutasModel.id_ruta}</h1>
      )}
      <Button onClick={() =>activador(bus.id_bus)} variant="success">Mover DT</Button>
    </React.Fragment>
  );
};

export default BusInfo;