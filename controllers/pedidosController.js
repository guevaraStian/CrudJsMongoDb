 // controller
 const Pedidos = require('../models/Pedidos');

 exports.nuevoPedido = async(req,res,next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje : 'Se agrego un nuevo pedido'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// muestra todos los pedidos

exports.mostrarPedidos = async(req,res,next) => {
    
    try {
        const pedidos =  await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// mostrar un pedido por el id

exports.mostrarPedido  = async(req,res,next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    })
    if (!pedido) {
        res.json({mensaje:'Pedido no existe'});
        return next();
    }
    //mostrar producto
    res.json(pedido);
}


// actualizar pedido

exports.actualizarPedido = async(req,res,next) => {
    try {
 
            let pedido = await Pedidos.findByIdAndUpdate({_id : req.params.idPedido}, req.body,{
                new: true
            }).populate('cliente').populate({
                path: 'pedido.producto',
                model: 'Productos'
            });
         //construir un nuevo pedido
            res.json(pedido);
 
       
    } catch (error) {
        console.log(console.error);
        next();
    }
     
 }

// eliminar pedido

  
exports.eliminarPedido =async (req,res,next) => {
    try {
        await Pedidos.findByIdAndDelete({_id : req.params.idPedido});
        res.json({mensaje : 'El pedido se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}



