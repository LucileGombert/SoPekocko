// Permet d'importer express
const express = require('express');

// Crée un routeur
const router = express.Router();

// Permet d'importer le controller sauce
const saucesCtrl = require('../controllers/sauces');



// Route get pour renvoyer toutes les sauces
router.get('/', saucesCtrl.getAllSauces);

// Route get pour renvoyer une sauce
router.get('/:id', saucesCtrl.getOneSauce);

// Route post pour créer une nouvelle sauce
router.post('/', saucesCtrl.createSauce);

// Route put pour modifier une sauce
router.put('/', saucesCtrl.modifySauce);

// Route delete pour supprimer une sauce
router.delete('/', saucesCtrl.deleteSauce);



// Permet d'exporter le router
module.exports = router;