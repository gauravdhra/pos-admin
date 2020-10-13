const express = require('express');
const http = require('http')
const path = require('path');

const app = express();  

app.use(express.static(path.join(__dirname, '/dist/POS-Admin/')));
console.log(path.join(__dirname, '/dist/POS-Admin/'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/POS-Admin/'));
}); 
const port = process.env.PORT || 5000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running'))