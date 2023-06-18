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
import Fill from 'ol/style/Fill';
import { Stroke, Text } from 'ol/style';
import { Button } from 'react-bootstrap';

const vec = [-76.9577902, -12.0371043];

export function MapComponent() {
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(vec);
  const [positionsHistory, setPositionsHistory] = useState([]);
  const markerRef = useRef(null);
  const lineRef = useRef(null);

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
        center: fromLonLat(position),
        zoom: 18,
      }),
    });

    const markerLayer = new VectorLayer({
      source: new VectorSource(),
    });
    initialMap.addLayer(markerLayer);
    /*
        const textStyle = new Style({
          text: new Text({
            text: 'Título del marcador',
            offsetY: -15,
            textAlign: 'center',
            fill: new Fill({ color: '#000000' }),
            font: '12px sans-serif', // Establecer la propiedad font directamente
          }),
        });*/

    const vecinoStyle = new Style({
      image: new Icon({
        src: require('./Imagenes/localizador.png'),
        anchor: [0.5, 1],
        scale: 0.09,
      }),
      //text: textStyle,
    });

    const vecinoFeature = new Feature({
      geometry: new Point(fromLonLat(position)),
    });
    vecinoFeature.setStyle(vecinoStyle);
    markerLayer.getSource().addFeature(vecinoFeature);

    markerRef.current = vecinoFeature;

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
  }, [position]);

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
      <h1>Mapa DE PRUEBAS</h1>
      <Button onClick={handleButtonClick}>{showMap ? "Ocultar" : "Mostrar"}</Button>
      <Button onClick={handleMover} variant="success">Mover</Button>
      {showMap && <div ref={mapRef} className="mapa" />}
    </div>
  );
}
