const express = require('express');
const router = express.Router();

const clienteController = require ('../controllers/clienteController');

//controlador productos

//controlador pedidos


module.exports = function(){
    // router.get('/', (req,res)=>{
    //     res.send('inicio')
    // }
    // );

    router.post('/clientes', clienteController.nuevoCliente);

    //obtener cleintes via GET
    router.get('/clientes', clienteController.mostrarCliente);

    //obtener clientes por id
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    //actualizar cliente por id
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    //eliminar cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    return router;
}

//rutas de productos

//rutas pedidos