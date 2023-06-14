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
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';



export function ParaderosMapa() {
    const { nombre, longitud, latitud } = useParams();
    
    const position = [longitud,latitud];
    const paraderoCor = [longitud, latitud];

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
  
  
      const paraderoStyle = new Style({
        image: new Icon({
          src: require('../../../Imagenes/paradero.png'),
          anchor: [0.5, 1],
          scale: 0.1,
        }),
      });
  
  
      const vecinoFeature = new Feature({
        geometry: new Point(fromLonLat(paraderoCor)),
      });

      vecinoFeature.setStyle(paraderoStyle);
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
        <h1>{nombre}</h1>
        <Button variant='warning'><Link to={'/paraderosCRUD'}>Atras</Link></Button>
        <Button onClick={handleButtonClick}>Mostrar Mapa</Button>
        {showMap && <div ref={mapRef} className="mapa" />}
      </div>
    );
  }
  