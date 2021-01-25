// Permet d'importer express
const express = require('express');

// Permet d'importer body-parser
const bodyParser = require('body-parser');

// Permet d'importer mongoose
const mongoose = require('mongoose');

// Permet d'accéder au chemin du système de fichiers
const path = require('path');


// Permet d'importer le router sauce
const saucesRoutes = require('./routes/sauces');

// Permet d'importer le router utilisateur
const userRoutes = require('./routes/user'); 

// require('dotenv').config();

// Permet de se connecter à MongoDB
mongoose.connect('mongodb+srv://user:mdp@cluster0.md8rb.mongodb.net/database?retryWrites=true&w=majority',
// mongoose.connect('mongodb+srv://process.env.DBUSER:process.env.DBPASSWORD@cluster0.md8rb.mongodb.net/process.env.DBNAME?retryWrites=true&w=majority',
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Permet de créer l'application express
const app = express();

// Middleware CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Transforme le corps de la requête en objet JS
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// Permet d'accéder aux routes pour les utilisateurs
app.use('/api/auth', userRoutes);

// Permet d'accéder aux routes pour les sauces
app.use('/api/sauces', saucesRoutes);

// Permet d'exporter l'application express pour pouvoir y accéder depuis les autres fichiers du projet 
module.exports = app;