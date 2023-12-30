const { Router } = require('express');
const passport = require('passport');
const user = require('../database/schemas/user');

const { hashPassword } = require('../utils/helpers');
const { comparePasswords } = require('../utils/helpers');

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

router.post('/register', async (req, res) => {
    const { email } = req.body;
    const userDB = await user.findOne({ $or:[{ email }] });
    if (userDB){
        res.status(400).send('Username or email already exists');
    } else {
        const password = hashPassword(req.body.password);
        console.log(password);
        const newUser = await user.create({
            password,
            email,
        });
        res.send(201);
    }
});

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

module.exports = router;