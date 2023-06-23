const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos desde la carpeta 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Ruta para manejar todas las solicitudes y enviar 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Iniciar el servidor en el puerto deseado (por ejemplo, 3000)
app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
