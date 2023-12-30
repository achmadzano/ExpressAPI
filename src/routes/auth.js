const { Router } = require('express');
const passport = require('passport');
const user = require('../database/schemas/user');
const { authRegisterController } = require('../controllers/auth');

const { hashPassword } = require('../utils/helpers');
const { comparePasswords } = require('../utils/helpers');
const authRegisterController = require('../controllers/auth');

const router = Router();

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) return res.send(400);
//     const userDB = await user.findOne({ email });
//     if (!userDB) return res.send(401);
//     const isValid = comparePasswords(password, userDB.password);
//     if (isValid) {
//         console.log('user logged in');
//         req.session.user = userDB;
//         return res.send(200);
//     } else {
//         console.log('invalid email or password');
//         return res.status(401).send('Invalid email or password');
//     }

// });

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('user logged in');
    res.send(200);
});

router.post('/register', authRegisterController);

router.post('/discord', passport.authenticate('discord'), (req, res) => {
    // console.log('user logged in');
    res.send(200);
});

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.send(200);
});

router.post('/google', passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => {
    // console.log('user logged in');
    res.send(200);
});

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.send(200);
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {
    res.send(200);
});

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
    res.send(200);
});

module.exports = router;