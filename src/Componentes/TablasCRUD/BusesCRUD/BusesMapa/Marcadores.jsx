const { Feature } = require('ol');
const { Point } = require('ol/geom');
const { fromLonLat } = require('ol/proj');
const { Style, Icon, Stroke } = require('ol/style');

export function BusMarcador({ pos }) {
    const BusMarcadorStyle = new Style({
        image: new Icon({
            src: require('../../../../Imagenes/localizador.png'),
            anchor: [0.5, 1],
            scale: 0.09,
        }),
    });

    const busP = new Feature({
        geometry: new Point(fromLonLat(pos)),
    });

    busP.setStyle(BusMarcadorStyle);
    return busP;
}


export function ParaderoMarcador({ pos }) {
    const paraderosStyle = new Style({
        image: new Icon({
            src: require('../../../../Imagenes/paradero.png'),
            anchor: [0.5, 1],
            scale: 0.09,
        }),
    });


    const paraderos = new Feature({
        geometry: new Point(fromLonLat(pos)),
    });

    paraderos.setStyle(paraderosStyle);
    return paraderos;
}

export function RastroMarcadores(){
    const lineStyle = new Style({
        stroke: new Stroke({
          color: '#FF0000',
          width: 2,
        }),
      });
  
      const lineFeature = new Feature();
      lineFeature.setStyle(lineStyle);
      return lineFeature;
}
