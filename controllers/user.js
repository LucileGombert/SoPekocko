// Permet d'importer le package bcrypt
const bcrypt = require('bcrypt');

// Permet de créer des tokens et de les vérifier
const jwt = require('jsonwebtoken');

// Permet de masquer l'adresse mail
const maskData = require('maskdata');

// Permet d'importer le package password-validator
const passwordValidator = require('password-validator');


// Permet d'importer le modèle de données pour un utilisateur
const User = require('../models/User');


// Permet de créer un schéma de validation de mot de passe
const schemaPassword = new passwordValidator();

schemaPassword
.is().min(8)                                    
.is().max(20)                                 
.has().uppercase()                              
.has().lowercase()                              
.has().digits(2)
.has().symbols(1)                                 
.has().not().spaces();


// // Options de masquage de l'adresse mail
// const emailMask2Options = {
//     maskWith: "*", 
//     unmaskedStartCharactersBeforeAt: 0,
//     unmaskedEndCharactersAfterAt: 2,
//     maskAtTheRate: false
// };


// Crée un nouvel utilisateur
exports.signup = (req, res, next) => {
    if(schemaPassword.validate(req.body.password)) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    // email: maskData.maskEmail2(req.body.email, emailMask2Options),
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({message: 'Utilisateur créé'}))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        throw 'Le mot de passe doit contenir entre 8 et 20 caractères dont au moins une lettre majuscule, une lettre minusucle, deux chiffres et un symbole';
    }
};


// Connecte un utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    // User.findOne({ email: maskData.maskEmail2(req.body.email, emailMask2Options) })
        .then(user => {
            if(!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};