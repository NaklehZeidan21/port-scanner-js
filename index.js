const express = require('express');
const portscanner = require('portscanner');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/scan', (req, res) => {
  res.send(`
  <div> <h1>Scan 1024 ports</h1></div>
    <form method="POST" action="/scan">
      <input type="text" name="ip" placeholder="Ingresa la dirección IP" required>
      <button type="submit">Escanear</button>
    </form>
  `);
});

app.post('/scan', (req, res) => {
  const ip = req.body.ip;
  const puertos = 1024; // Número total de puertos a escanear
  
  const openPorts = [];
  let scannedPorts = 0;

  for (let puerto = 1; puerto <= puertos; puerto++) {
    portscanner.checkPortStatus(puerto, ip, (error, status) => {
      scannedPorts++;
      if (status === 'open') {
        openPorts.push(puerto);
      }
     
      if (scannedPorts === puertos) {
        openPorts.sort((a, b) => a - b); // Ordenar los puertos de forma ascendente
        res.send(`Los puertos abiertos en la dirección IP ${ip} son: ${openPorts.join(', ')}`);
      }
      
    }
    
   
    );
   
  }
});

app.listen(3000, () => {
  console.log('Servidor web en funcionamiento en el puerto 3000');
});
