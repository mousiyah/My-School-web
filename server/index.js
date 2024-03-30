require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./utils/logger')
const errorHandler = require('./utils/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const fs = require('fs');
const sequelize = require('./config/db');

const PORT = process.env.SERVER_PORT

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())


// Sequalize database
async function main() {
    try {
      await sequelize.sync({ alter: true });
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }


app.use('/', express.static(path.join(__dirname, 'public')))

// Include all routes.
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.js')) {
        const route = require(path.join(routesPath, file));
        app.use('/', route);
    }
});

// Wrong route
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
