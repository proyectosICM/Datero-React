import axios from "axios";

export function agregarElemento(url, requestData, closeModal, ListarDatos) {
  axios
    .post(url, requestData)
    .then(() => {
      closeModal();
      ListarDatos();
    })
    .catch((error) => {
      console.log(error);
    });
} 

export function editarElemento(url, requestData, closeModal, ListarDatos) {
  axios
    .put(url, requestData)
    .then(() => {
      closeModal();
      ListarDatos();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function habilitarElemento(url, id, est, ListarDatos) {
    const nurl = `${url}/${id}`
  axios.get(nurl).then((response) => {
    const elemento = response.data;
    elemento[est] = true;
    axios.put(nurl, elemento).then(() => {
      ListarDatos();
    });
  });
}

export function deshabilitarElemento(url, id, est, ListarDatos) {
    const nurl = `${url}/${id}`
  axios.get(nurl).then((response) => {
    const elemento = response.data;
    elemento[est] = false;
    axios.put(nurl, elemento).then(() => {
      ListarDatos();
    });
  });
}


export function MoverBus(url, id, lat, lon, pla, ListarDatos) {
  const nurl = `${url}/${id}`;
  axios.get(nurl).then((response) => {
    const autobus = response.data;

    const newLat = autobus[lat] + 0.0002003;
    const newLon = autobus[lon] + 0.0002003;

    autobus[lat] = newLat;
    autobus[lon] = newLon;

    autobus[pla] = 'A222A';
    axios.put(nurl, autobus).then(() => {
      ListarDatos();
    });
  });
}
 
