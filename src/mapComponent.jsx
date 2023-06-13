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
import { Point } from 'ol/geom';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';

const vec = [-76.9577902, -12.0371043];
const nvec = [-76.9577902, -12.0372];

export function MapComponent() {
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(vec); // Posición inicial definida con vec
  const markerRef = useRef(null); // Ref para almacenar la referencia al marcador

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

    setMap(initialMap);
  }, [position]);

  const handleButtonClick = () => {
    setShowMap(!showMap);
  };

  const handleMover = () => {
    setPosition(nvec); // Actualiza la posición a nvec
    console.log('mover');
  };

  useEffect(() => {
    if (showMap && map === null) {
      createMap();
      console.log('mapa creado');
    }
  }, [showMap, map, createMap]);

  useEffect(() => {
    if (markerRef.current && map !== null) {
      markerRef.current.getGeometry().setCoordinates(fromLonLat(position));
    }
  }, [position, map]);

  return (
    <div className="container-registros">
      <h1>Mapa 2</h1>
      <button onClick={handleButtonClick}>Mostrar Mapa</button>
      <button onClick={handleMover}>Avanzar</button>
      {showMap && <div ref={mapRef} className="mapa" />}
    </div>
  );
}
