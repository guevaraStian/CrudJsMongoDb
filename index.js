const express = require('express');
const routes = require('./routes');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');


//conectar a mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis',{
    useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true,
})


//crear el servidor
const app = express();

//habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//rutas de la app
app.use('/',routes());

//puerto
app.listen(5000);






