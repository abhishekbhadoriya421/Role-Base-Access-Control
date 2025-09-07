const express = require('express');
const port = 8080;
const app = express();
require('dotenv').config();
const connectDb = require('./config/db');
const routerIndex = require('./router/indexRouter');
const flash = require('connect-flash');
const session = require('express-session');
const { FlashMiddleware } = require('./middleware/flashMessageMiddleware');
const cookieParser = require('cookie-parser');
const { connectRedis } = require('./config/redis');

app.use(cookieParser());


connectDb();



app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to handle form data
app.set('view engine', 'ejs');

/**
 * Set Session 
 */
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}))

app.use(cookieParser());


/**
 * Set Flash Message
 */
app.use(flash());

app.use(FlashMiddleware);

app.use('/', routerIndex);

app.use((req, res, next) => {
    return res.render('pageNotFound');
});

app.use((err, req, res, next) => {
    return res.render('errorpage');
});

(async () => {
    await connectRedis()
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
})()
