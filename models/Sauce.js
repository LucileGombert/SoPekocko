// Permet d'importer mongoose
const mongoose = require('mongoose');

// Modèle de données pour une sauce
const sauceSchema = mongoose.Schema({
    id: {type: String, required: true},
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    usersLiked: {type: String, required: true},
    usersDisliked: {type: String, required: true},
});

// Permet d'exporter le modèle
module.exports = mongoose.model('Sauce', sauceSchema);