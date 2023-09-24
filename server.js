/* Imports */
const express = require('express')
const mongoose = require ('mongoose')
const routes = require('./routes/routes')
require('dotenv').config()

/* Initialisations */
const app = express()

/* DB Connection */
mongoose.connect(process.env.DATABASE_STRING).then(
    () => {
        console.log('Connected to MongoDB');
    }
).catch(
    (err) => {
        console.error('Error connecting to MongoDB:', err);
    }
);

/* Routes */
app.use('/', routes)

/* Listening */
app.listen(process.env.PORT, () => console.log(`Server running on port: http://localhost:${process.env.PORT}`))