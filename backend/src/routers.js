const { Router } = require('express');

const router = Router();

const User = require('./User')
const controller = require('./models')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart({uploadDir:'./uploads'})

router.post('/signup',controller.signup);
router.post('/signin',controller.signin);
router.post('/savecompo',controller.authToken,controller.saveComponents);
router.post('/uploadImage/:id',multipartMiddleware,controller.uploadImage);
router.get('/component/:id',controller.getComponent)
router.get('/components',controller.getComponents);
router.get('/getimage/:image',controller.getImageFIle);
router.put('/component/:id',controller.authToken,controller.updateComponent);
router.delete('/component/:id',controller.authToken,controller.deteleComponent);
router.get('/tasks', (req, res) => {
   
});

router.get('/private', controller.authToken, (req, res) => {
    
});


module.exports = router;