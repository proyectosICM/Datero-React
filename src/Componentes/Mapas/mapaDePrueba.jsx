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

const position = [-76.95769789314294, -12.036776926858456];
const yo = [-76.95769789314294, -12.036776926858456];
const vec = [-76.9577902, -12.0371043];

export function MapaDePrueba() {
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);

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
        zoom: 15,
      }),
    });

    const markerLayer = new VectorLayer({
      source: new VectorSource(),
    });
    initialMap.addLayer(markerLayer);

    const markerFeature = new Feature({
      geometry: new Point(fromLonLat(yo)),
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
      geometry: new Point(fromLonLat(vec)),
    });
    vecinoFeature.setStyle(vecinoStyle);
    markerLayer.getSource().addFeature(vecinoFeature);

    setMap(initialMap);
  }, []);

  const handleButtonClick = () => {
    setShowMap(!showMap);
  };

  useEffect(() => {
    if (showMap) {
      createMap();
      console.log("mapa creado");
    }
  }, [showMap, createMap]);

  return (
    <div className="container-registros">
      <h1>Mapa</h1>
      <button onClick={handleButtonClick}>Mostrar Mapa</button>
      {showMap && <div ref={mapRef} className="mapa" />}
    </div>
  );
}
