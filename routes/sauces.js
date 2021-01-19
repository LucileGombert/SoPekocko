// Permet d'importer express
const express = require('express');

// Crée un routeur
const router = express.Router();


// Permet d'importer le controller sauce
const saucesCtrl = require('../controllers/sauces');

// Permet d'importer le middleware auth
const auth = require('../middleware/auth');

// Permet d'importer le middleware multer
const multer = require('../middleware/multer-config');


// Route post pour créer une nouvelle sauce
router.post('', auth, multer, saucesCtrl.createSauce);

// Route post pour liker une sauce
// router.post('/:id/like', auth, multer, saucesCtrl.likeSauce);

// Route put pour modifier une sauce
router.put('/:id', auth, multer, saucesCtrl.modifySauce);

// Route delete pour supprimer une sauce
router.delete('/:id', auth, saucesCtrl.deleteSauce);

// Route get pour renvoyer toutes les sauces
router.get('', auth, saucesCtrl.getAllSauces);

// Route get pour renvoyer une sauce
router.get('/:id', auth, saucesCtrl.getOneSauce);



// Permet d'exporter le router
module.exports = router;