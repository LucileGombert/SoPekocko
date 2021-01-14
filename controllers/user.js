// Permet d'importer le package bcrypt
const bcrypt = require('bcrypt');

// Permet d'importer le modèle de données pour un utilisateur
const User = require('../models/User');

// Crée un nouvel utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.passeword, 10)
        .then(hash => {
            const user = new User({
                userId: req.body.userId,
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

// Connecte un utilisateur
exports.login = (req, res, next) => {
    User.findOne({userId: req.body.userId})
        .then(user => {
            if(!user) {
                return res.status(401).json({error: 'Utilisateur non trouvé'});
            }
            bcrypt.compare(req.body.password, user.passeword)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({error: 'Mot de passe incorrect'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: 'TOKEN'
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};