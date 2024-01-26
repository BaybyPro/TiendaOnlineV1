'use strict'
const { model } = require('mongoose')
const User = require('./User')
const path = require('path')
const { json } = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const Componente = require('./components');
const fs = require('fs');
const components = require('./components');


const controller ={

    signup: async (req,res)=>{
        const newUser ={
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10)
        }

        try{
            const existingUser = await User.findOne({email: newUser.email})
            if(existingUser){ return res.status(409).send('Usuario ya registrado')}
            const user = new User(newUser)
            await user.save();
            const expires = 1 * 60 * 60
            const token = await jwt.sign({_id:user._id},'SECRET_KEY',{expiresIn:expires})
            
            res.json({token:token})
        }
        catch(err){
               res.status(500).send('Error del servidor')

        }
        

        
    },

    signin: async (req,res)=>{
        const userData={
            email: req.body.email,
            password: req.body.password
        }
        try{
        const user = await User.findOne({email: userData.email});
        if (!user) return res.status(404).send('user invalid');
        
        
        const passwordValid = bcrypt.compareSync(userData.password,user.password)
        if(passwordValid){
        const expires = 1 * 60 * 60
        const token = jwt.sign({_id:user._id},'SECRET_KEY',{expiresIn:expires})
        res.json({token:token})
        }else{
            return res.status(404).send('user invalid');
        }
        } 
        catch{
            res.status(500).send('Server error')
        }
    },

    authToken: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).send('Cabecera inválida');
        }
    
        const token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Token no válido');
        }
    
        try {
            const data = jwt.verify(token, 'SECRET_KEY');
            req.userId = data._id;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).send('El token ha expirado');
            } else {
                return res.status(401).send('Error en la autenticación');
            }
        }
    },
    

    authToken2:(req,res,next)=>{
        console.log(req.headers.authorization)
    },


    saveComponents:(req,res)=>{
      var component = new Componente();
      var params = req.body;

      component.name = params.name;
      component.category = params.category;
      component.description = params.description;
      component.precio = params.precio;
      component.stock = params.stock;
      component.image = null ;
      
      component.save()
      .then(
        (componentSave)=>{
            if(!componentSave) return res.status(404).send('Error del componente')
            return res.status(200).send({component:componentSave})
        }

      )
      .catch((err)=>{
             res.status(500).send('Error del servidor')
      }

      )},

    saveDescription(req,res){
        try{
            
        }
        catch{

        }

    },
    
    uploadImage: (req, res) => {
        var compoId = req.params.id;
        var fileName = 'imagen no subida...';
    
        if (req.files && req.files.image) { // Verifica si 'image' existe en req.files
            const filePath = req.files.image.path;
            const fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            const extSplit = fileName.split('.');
            const fileExt = extSplit[1];
    
            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Componente.findByIdAndUpdate(compoId, { image: fileName }, { new: true })
                    .then(
                        (compoImage) => {
                            if (!compoImage) { return res.status(404).send('el componente no existe'); }
                            return res.status(200).send({ compo: compoImage });
                        }
                    )
                    .catch((err) => {
                        return res.status(500).send('la imagen no se subió');
                    });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(405).send('la extensión no es válida');
                });
            }
        } else {
            return res.status(200).send({ message: 'Subido sin imagen' });
        }
    },
    

    getComponent:(req,res)=>{
          const compoId = req.params.id;
          Componente.findById(compoId)
          .then((compo)=>{
            if(!compo){ return res.status(404).send('componente no encontrado')}
            return res.status(200).send({component:compo})
          }
          )
          .catch((err)=>{
            return res.status(500).send({'error del servidor':err})
          })
    },

    getComponents: (req,res) =>{
        Componente.find({}).sort({createdAt:-1}).exec()
        .then(
           (components)=>{
                if (!components || components.length === 0){
                    return res.status(404).send('no se encontraron componentes')
                }
                return res.status(200).send(components)
           }
        )
        .catch(
            (err)=>{
                return res.status(500).send('error del servidor')
            }
        )

    },

    getImageFIle:(req,res)=>{
               const file = req.params.image;
               const path_file = './uploads/'+file;

               fs.exists(path_file, (exists)=>{
                 if(exists){
                    return res.sendFile(path.resolve(path_file));
                 }else{
                    return res.status(200).send('no existe imagen')
                 };
               })
    },

    updateComponent:(req,res)=>{
              const compoId = req.params.id;
              const update = req.body;

              Componente.findByIdAndUpdate(compoId,update)
              .then(
                (compoUpdate)=>{
                    if(!compoUpdate){return res.status(404).send('Componente noe ncontrado')};
                    return res.status(200).send({component: compoUpdate})
                }  
              )
              .catch(
                (err)=>{
                    return res.status(500).send('error del servidor')
                }
              )
    },

    deteleComponent:(req,res)=>{
        const compoId = req.params.id;

        Componente.findByIdAndDelete(compoId)
        .then(
            (compoDelete)=>{
                if(!compoDelete){return res.status(404).send('no se encontró el proyecto')}
                return res.status(200).send({component:compoDelete})
            }
        )
        .catch(
            (err)=>{return res.status(500).send('error del servidor')}
        )

    }

}

module.exports = controller