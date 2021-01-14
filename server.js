// Permet d'importer le package http de Node
const http = require('http');

// Permet d'importer l'application
const app = require('./app');

// Indique à l'application sur quel port elle doit être lancée
app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);


server.listen(process.env.PORT || 3000);