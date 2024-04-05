require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const errorHandler = require('./utils/error-handler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/cors-options');
const fs = require('fs');
const sequelize = require('./config/db');

const PORT = process.env.SERVER_PORT;

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(errorHandler);

app.use('/', express.static(path.join(__dirname, 'public')));

// database connection check
async function dbCheck () {
    sequelize.authenticate().then(() => {
        console.log('Database Connection has been established successfully.');
     }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
     });
}

// database sync
async function dbSync () {
    sequelize.sync( {force: true}, {alter: true} ).then(() => {
        console.log('Database synced with models!');
     }).catch((error) => {
        console.error('Unable to sync database: ', error);
     });     
}

dbCheck();
dbSync();

// Include all routes
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.js')) {
        const route = require(path.join(routesPath, file));
        app.use('/', route);
    }
});

// Wrong routes
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({message: '404 Not Found'});
    } else {
        res.type('txt').send('404 Not Found');
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
