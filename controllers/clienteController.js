const Clientes = require ('../models/Clientes');


//CRUD

//agregar un nuevo cliente
//async = solo hace 1 vez la peticion 
exports.nuevoCliente = async(req,res,next)=>{
    const cliente = new Clientes(req.body);


    try{
        //almacenar el registro
        await cliente.save();
        res.json({mensaje: 'Se agrego un nuevo cliente'});
    
     } catch(error) {
            console.log(error);
            next();  
        }

}


//muestra todos  los clientes
exports.mostrarCliente = async(req,res,next)=>{
    try{
        const clientes = await Clientes.find({});
        res.json(clientes);
             
    
     } catch(error) {
            console.log(error);
            next();  
        }
}

// mostrar cliente por id

exports.mostrarCliente = async(req,res,next)=>{
    const cliente = await Clientes.findById(req.params.idCliente);
    if(!cliente){
       
        res.json({mensaje: 'Ese cliente no existe'});
    }
    //mostrar cliente
        res.json(cliente);
        
}


//actualizar un cliente

exports.actualizarCliente = async(req,res,next)=>{
    try{
        const clientes = await Clientes.findByIdAndUpdate({_id : req.params.idCliente},
        req.body,{
            new:true

        })
        res.json(cliente);
             
    
     } catch(error) {
            console.error();
            next();  
        }

}

//Eliminar un cliente

exports.eliminarCliente = async (req,res,next)=>{
    try {
        await Clientes.findByIdAndDelete({_id : req.params.idCliente});
        res.json({mensaje: ' El cliente se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}