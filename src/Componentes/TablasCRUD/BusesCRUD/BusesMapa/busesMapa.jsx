import React, { useEffect, useRef, useCallback, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { LineString } from 'ol/geom';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { busesURL } from '../../../API/apiurls';
import BusInfo from './busInfo';
import { BusMarcador, ParaderoMarcador, RastroMarcadores } from './Marcadores';
import { MoverBus } from '../../../API/apiCRUD';

export function BusesMapa({ dat }) {
  const { dts, rt } = useParams();
  const vec = [-76.973094400000000, -12.062200700000000];

  const [bus, setBus] = useState(null);
  const [datos, setDatos] = useState([]);

  const [position, setPosition] = useState(vec);
  const [positionsHistory, setPositionsHistory] = useState([]);
  const markerRef = useRef(null);
  const lineRef = useRef(null);
  const busRef = useRef(null);
  const markerLayerRef = useRef(null); // Nueva referencia para el markerLayer

  const ListarBuses = useCallback(async () => {
    const response = await axios.get(`${busesURL}/${dts}`);
    setBus(response.data);
  }, [dts]);

  const ListarDatos = useCallback(async () => {
    const results = await axios.get(`http://localhost:8080/api/rp/rxp/${rt}`);
    setDatos(results.data);
  }, [rt]);

  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);

  useEffect(() => {
    ListarBuses();
    ListarDatos();
  }, [ListarBuses, ListarDatos]);

  const createMap = useCallback(() => {
    const busPosition = [bus.longitud, bus.latitud];

    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            attributions: '© Datero APP',
          }),
        }),
      ],
      view: new View({
        center: fromLonLat(busPosition),
        zoom: 15,
      }),
    });

    const markerLayer = new VectorLayer({
      source: new VectorSource(),
    });

    initialMap.addLayer(markerLayer);
    markerLayerRef.current = markerLayer; // Asignar markerLayer a la referencia

    //Inicio de Rutas
    datos.forEach((dato) => {
      const { longitud, latitud } = dato.paraderosModel;

      const paraderoMarcador = ParaderoMarcador({ pos: [longitud, latitud] });
      markerLayer.getSource().addFeature(paraderoMarcador);
    });
    //Fin de Rutas

    //Inicio Buses Marcadores
    const busMarcador = BusMarcador({ pos: position });
    markerLayer.getSource().addFeature(busMarcador);

    const busActual = BusMarcador({ pos: busPosition });
    markerLayer.getSource().addFeature(busActual);

    markerRef.current = busMarcador;
    busRef.current = busActual;
    //Fin Buses Marcadores

    //Rastro de Marcadores
    const lineSource = new VectorSource();
    const lineLayer = new VectorLayer({
      source: lineSource,
    });
    initialMap.addLayer(lineLayer);

    const rastrobusprueba = RastroMarcadores();
    lineSource.addFeature(rastrobusprueba);
    lineRef.current = rastrobusprueba;
    //Fin de Rastro de Marcadores

    setMap(initialMap);
  }, [datos, bus, position]);

  const handleButtonClick = () => {
    setShowMap(!showMap);
  };

  const handleMover = useCallback(() => {
    const newLon = position[0] + (Math.random() * 0.001 - 0.0005);
    const newLat = position[1] + (Math.random() * 0.001 - 0.0005);
    const newPosition = [newLon, newLat];

    setPositionsHistory(prevHistory => [...prevHistory, newPosition]);
    setPosition(newPosition);
  }, [position]);

  const handleMoverBusDT = (id) => {
    MoverBus(busesURL, id, `latitud`, `longitud`, `placa_bus`, () => {
      ListarBuses();
      const newBusPosition = [bus.longitud, bus.latitud];
      // Actualizar la posición del marcador en el mapa
      const busActual = BusMarcador({ pos: newBusPosition });
      markerLayerRef.current.getSource().removeFeature(busRef.current);
      markerLayerRef.current.getSource().addFeature(busActual);
      busRef.current = busActual;
    });
  };

  useEffect(() => {
    if (showMap && map === null) {
      createMap();
      handleMover();
      //console.log('mapa creado');
    }
  }, [showMap, map, createMap, handleMover]);

  useEffect(() => {
    if (markerRef.current && map !== null) {
      markerRef.current.getGeometry().setCoordinates(fromLonLat(position));
    }
  }, [position, map]);

  useEffect(() => {
    if (lineRef.current && map !== null) {
      const coordinates = positionsHistory.map(pos => fromLonLat(pos));
      const lineGeometry = new LineString(coordinates);
      lineRef.current.setGeometry(lineGeometry);
    }
  }, [positionsHistory, map]);

  return (
    <div className="container-registros">
      <h1>Mapa</h1>
      <BusInfo bus={bus} activador={handleMoverBusDT} />
      <Button variant="warning">
        <Link to={'/listvehiculos'}>Atras</Link>
      </Button>
      <Button onClick={handleButtonClick}>Mostrar Mapa</Button>
      <Button onClick={handleMover} variant="success">Mover BF</Button>
      {showMap && <div ref={mapRef} className="mapa" />}
    </div>
  );
}
