const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./strategies/local');
require('./strategies/discord');
// require('./strategies/google');
// require('./strategies/github');

// Routes
const groceriesRoute = require('./routes/groceries');
const marketsRoute = require('./routes/markets');
const authRoute = require('./routes/auth');

require('./database');

const app = express();
const port = 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
    session({
        secret: "zano",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ 
            mongoUrl: 'mongodb://localhost:27017/expressjs_tutorial' 
        }),
    })
);

// middleware as a middle man
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
    });

// app.use((req, res, next) => {
//     if (req.session.user) {
//         next();
//     } else {
//         res.send(401);
//     };
// });

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/groceries', groceriesRoute);
app.use('/api/v1/markets', marketsRoute);
app.use('/api/v1/auth', authRoute);

app.listen(port, () => console.log(`Running Express Server on port ${port}!`));





// npm run start:dev