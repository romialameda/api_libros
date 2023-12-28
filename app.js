const express = require('express');
const app = express();
app.use(express.json());

//Importar el Router de Libros
const librosRouter = require('./routes/libros');

//Importar el Middleware Error Handler
const errorHandler = require('./middlewares/errorHander');

app.use ('/libros', librosRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});