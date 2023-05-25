const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJS = require('swagger-jsdoc');

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Application started and listening on PORT ' + PORT);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], 
}

const openapiSpecifications = swaggerJS(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecifications));
