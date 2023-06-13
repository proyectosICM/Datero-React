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

const position = [-76.95769789314294, -12.036776926858456];
const yo = [-76.95769789314294, -12.036776926858456];
const ruta = [
  [-76.95769789314294, -12.036776926858456],
  [-76.957800, -12.037100],
  [-76.958000, -12.037300],
];

export function Ruta1() {
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);

  const createMap = useCallback(async () => {
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

    const yoStyle = new Style({
      image: new Icon({
        src: require('../../Imagenes/localizador.png'),
        anchor: [0.5, 1],
        scale: 0.09,
      }),
    });

    const markerFeature = new Feature({
      geometry: new Point(fromLonLat(yo)),
    });

    markerLayer.setStyle(yoStyle);
    markerLayer.getSource().addFeature(markerFeature);

    const routeFeature = new Feature({
      geometry: new LineString(ruta.map(coord => fromLonLat(coord))),
    });
    markerLayer.getSource().addFeature(routeFeature);
  }, []);

  const handleButtonClick = () => {
    setShowMap(!showMap);
  };

  useEffect(() => {
    if (showMap) {
      createMap();
      console.log('mapa creado');
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
