const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'project', 'public')));

// Enviar el archivo HTML para todas las rutas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'project', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});