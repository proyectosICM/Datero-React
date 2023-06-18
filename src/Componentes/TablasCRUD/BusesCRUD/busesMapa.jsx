import React, { useEffect, useRef, useCallback, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point, LineString } from 'ol/geom';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Stroke, Text } from 'ol/style';
import axios from "axios";
import { busesURL } from '../../API/apiurls';


export function BusesMapa({ dat }) {
  const { dts, rt } = useParams();
  const vec = [-76.973094400000000, -12.062200700000000];
  
  const [bus, setBus] = useState(null);
  const [datos, setDatos] = useState([]);
  const [position, setPosition] = useState(vec);
  const [positionsHistory, setPositionsHistory] = useState([]);
  const markerRef = useRef(null);
  const lineRef = useRef(null);

  const ListarBuses = useCallback(async () => {
    const response = await axios.get(`${busesURL}/${dts}`);
    setBus(response.data);
  }, [dts]);

  const ListarDatos = useCallback(async () => {
    const results = await axios.get(`http://localhost:8080/api/rp/rxp/${rt}`);
    setDatos(results.data);
  }, [rt]);



  const mapRef = useRef(null);
  const mapCreatedRef = useRef(false);
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);

  useEffect(() => {
    ListarBuses();
    ListarDatos();
  }, [ListarBuses, ListarDatos]);

  useEffect(() => {
    console.log(bus);
  }, [bus]);

  const createMap = useCallback(() => {
    const position2 = [bus.longitud, bus.latitud];

    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            attributions: '© Google Maps',
          }),
        }),
      ],
      view: new View({
        center: fromLonLat(position),
        zoom: 15,
      }),
    });

    const markerLayer = new VectorLayer({
      source: new VectorSource(),
    });

    initialMap.addLayer(markerLayer);

    datos.forEach((dato) => {
      const { longitud, latitud } = dato.paraderosModel;
      const punteroStyle = new Style({
        image: new CircleStyle({
          radius: 5,
          fill: null,
        }),
      });

      const bus2Style = new Style({
        image: new Icon({
          src: require('../../../Imagenes/localizador.png'),
          anchor: [0.5, 1],
          scale: 0.09,
        }),
      });

      const bus2 = new Feature({
        geometry: new Point(fromLonLat(position2)),
      });

      bus2.setStyle(bus2Style);
      markerLayer.getSource().addFeature(bus2);

      const paraderosStyle = new Style({
        image: new Icon({
          src: require('../../../Imagenes/paradero.png'),
          anchor: [0.5, 1],
          scale: 0.09,
        }),
      });

      const feature = new Feature({
        geometry: new Point(fromLonLat([longitud, latitud])),
      });

      feature.setStyle(paraderosStyle);
      markerLayer.getSource().addFeature(feature);
    });


    const busStyle = new Style({
      image: new Icon({
        src: require('../../../Imagenes/localizador.png'),
        anchor: [0.5, 1],
        scale: 0.09,
      }),
    });

    const busP = new Feature({
      geometry: new Point(fromLonLat(position)),
    });

    busP.setStyle(busStyle);

    markerLayer.getSource().addFeature(busP);

    markerRef.current = busP;
    
    const lineSource = new VectorSource();
    const lineLayer = new VectorLayer({
      source: lineSource,
    });
    initialMap.addLayer(lineLayer);

    const lineStyle = new Style({
      stroke: new Stroke({
        color: '#FF0000',
        width: 2,
      }),
    });

    const lineFeature = new Feature();
    lineFeature.setStyle(lineStyle);
    lineSource.addFeature(lineFeature);

    lineRef.current = lineFeature;




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


  useEffect(() => {
    if (showMap && map === null) {
      createMap();
      handleMover();
      console.log('mapa creado');
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
      {bus && bus.placa_bus && <h1>Placa {bus.placa_bus}</h1>}
      {bus && bus.rutasModel && bus.rutasModel.id_ruta && (
        <h1>RUTA {bus.rutasModel.id_ruta}</h1>
      )}
      <Button variant="warning">
        <Link to={'/listvehiculos'}>Atras</Link>
      </Button>
      <Button onClick={handleButtonClick}>Mostrar Mapa</Button>
            <Button onClick={handleMover} variant="success">Mover</Button>
      {showMap && <div ref={mapRef} className="mapa" />}
    </div>
  );
}
