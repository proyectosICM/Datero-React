import React, { useEffect, useRef, useState } from 'react';
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

export function MapaQueSeMueve() {
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);
  const [routeIndex, setRouteIndex] = useState(0); // Index to keep track of the current position in the route
  const route = [
    [-76.9577902, -12.0371043], // Coordinate 1
    [-76.9578502, -12.0372003], // Coordinate 2
    [-76.9579002, -12.0373003], // Coordinate 3
    // Add more coordinates as needed
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRouteIndex((prevIndex) => (prevIndex + 1) % route.length); // Update route index cyclically
    }, 5000); // Update marker every 5 seconds

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  useEffect(() => {
    if (showMap) {
      // Clear previous map if it exists
      if (map) {
        map.setTarget(null);
        setMap(null);
      }

      const newMap = new Map({
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
          center: fromLonLat([-76.95769789314294, -12.036776926858456]),
          zoom: 18,
        }),
      });

      const markerLayer = new VectorLayer({
        source: new VectorSource(),
      });
      newMap.addLayer(markerLayer);

      const markerFeature = new Feature({
        geometry: new Point(fromLonLat([-76.95769789314294, -12.036776926858456])),
      });
      markerLayer.getSource().addFeature(markerFeature);

      const vecinoStyle = new Style({
        image: new Icon({
          src: require('./Imagenes/localizador.png'),
          anchor: [0.5, 1],
          scale: 0.09,
        }),
      });

      const vecinoFeature = new Feature({
        geometry: new Point(fromLonLat(route[routeIndex])),
      });
      vecinoFeature.setStyle(vecinoStyle);
      markerLayer.getSource().addFeature(vecinoFeature);

      setMap(newMap);
    }
  }, [showMap, routeIndex]);

  const handleButtonClick = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="container-registros">
      <h1>Mapa</h1>
      <button onClick={handleButtonClick}>Mostrar Mapa</button>
      {showMap && <div ref={mapRef} className="mapa" />}
    </div>
  );
}
