import React, { useEffect, useRef, useCallback, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point, LineString } from 'ol/geom';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { Stroke } from 'ol/style';
import { Button } from 'react-bootstrap';

const vec = [-76.9577902, -12.0371043];

export function MapComponent() {
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false); 
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(vec); // Posición inicial definida con vec
  const [positionsHistory, setPositionsHistory] = useState([]); // Historial de posiciones
  const markerRef = useRef(null); // Ref para almacenar la referencia al marcador
  const lineRef = useRef(null); // Ref para almacenar la referencia a la línea

  const createMap = useCallback(() => {
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            attributions: '© Google Maps 2',
          }),
        }),
      ],
      view: new View({
        center: fromLonLat(position), // Utiliza la posición actual
        zoom: 18,
      }),
    });

    const markerLayer = new VectorLayer({
      source: new VectorSource(),
    });
    initialMap.addLayer(markerLayer);

    const vecinoStyle = new Style({
      image: new Icon({
        src: require('./Imagenes/localizador.png'),
        anchor: [0.5, 1],
        scale: 0.09,
      }),
    });

    const vecinoFeature = new Feature({
      geometry: new Point(fromLonLat(position)), // Utiliza la posición actual
    });
    vecinoFeature.setStyle(vecinoStyle);
    markerLayer.getSource().addFeature(vecinoFeature);

    markerRef.current = vecinoFeature; // Almacena la referencia al marcador

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

    lineRef.current = lineFeature; // Almacena la referencia a la línea

    setMap(initialMap);
  }, [position]);

  const handleButtonClick = () => {
    setShowMap(!showMap);
  };

  const handleMover = useCallback(() => {
    const newLon = position[0] + (Math.random() * 0.001 - 0.0005);
    const newLat = position[1] + (Math.random() * 0.001 - 0.0005);
    const newPosition = [newLon, newLat];

    setPositionsHistory(prevHistory => [...prevHistory, newPosition]); // Agrega la nueva posición al historial
    setPosition(newPosition); // Actualiza la posición a la nueva posición
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
      //handleMover();
    }
  }, [positionsHistory, map]);

  return (
    <div className="container-registros">
      <h1>Mapa</h1>
      <Button onClick={handleButtonClick}>{showMap ? "Ocultar" : "Mostrar"}</Button>
      <Button onClick={handleMover} variant="success" >Mover</Button>
      {showMap && <div ref={mapRef} className="mapa" />}
    </div>
  );
}
