const Productos = require('../models/Productos');

// multer - shortid
//multer es para subidas de archivos
// shortid es para el id unico de cada elemento
const multer = require('multer');
const shortid = require('shortid');






const configuracionMulter = {
    storage : fileStorage = multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req,file,cb) => {
          const extension = file.mimetype.split('/')[1];
          //minetype sirve para reconocer que es un archivo
          cb(null,`${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,cb){
        if (file.mimetype === 'image/jpeg' || file.mimetype ==='image/png'){
            cb(null,true);
        }else{
            cb(new Error('Formato no valido'))
        }
    },
}

// Pasar la configuracion y el campo
const upload = multer (configuracionMulter).single('imagen');

//Sube un archivo
exports.subirArchivo = (req,res,next) =>{
    upload(req,res, function(error){
        if(error){
            res.json({mensaje:error})
        }
        return next();
    })
}

// Agregar un nuevo Producto -1
exports.nuevoProducto  = async(req,res,next) => {
    const producto = new Productos(req.body);
    try {
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje:'se agrego un nuevo producto'})
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar todos los productos

exports.mostrarProductos = async(req,res,next) => {
    try {
        // obtener todos los productos
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(console.error);
        next();
        
    }
}

// muestra un producto por id
exports.mostrarProducto  = async(req,res,next) => {
    const producto = await Productos.findById(req.params.idProducto);
    if (!producto) {
        res.json({mensaje:'Producto no existe'});
        return next();
    }
    //mostrar producto
    res.json(producto);
}

// actualizar producto
exports.actualizarProducto  = async(req,res,next) => {
    try {
        
         //construir un nuevo producto
         let nuevoProducto = req.body;
 
         //verificamos si hay una imagen
         if (req.file) {
             nuevoProducto.imagen = req.file.filename;
         } else {
             let productoAnterior = await Productos.findById(req.params.idProducto);
             nuevoProducto.imgen = productoAnterior.imagen;
         }
 
        let producto = await Productos.findByIdAndUpdate({_id: req.params.idProducto},
        req.body,{
            new: true,
        });
        
     res.json(producto);
    } catch (error) {
        console.log(console.error);
        next();
    }
     
 }

// eliminar producto
exports.eliminarProducto =async (req,res,next) => {
    try {
        await Productos.findByIdAndDelete({_id : req.params.idProducto});
        res.json({mensaje : 'El producto se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}








