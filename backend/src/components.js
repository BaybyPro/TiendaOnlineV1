const {Schema, model}= require('mongoose')


const desSchema = new Schema({
    _id: Schema.Types.ObjectId,
    marca : String,
    modelo : String,
    pantalla : String,
    procesador : String,
    ram : String,
    almacenamiento: String,
    grafica: String,
    sistema: String,
})
const CompoSchema = new Schema({
    name: String,
    category: String,
    description: [desSchema],
    precio: {
        type: Number,
        min: 0,  // Establece el valor mínimo, puede ser cualquier número
        max: 99999,  // Establece el valor máximo, ajusta según tus necesidades
        required: true
    },
    stock: Number,
    image: String
},{
    timestamps:true
})

module.exports = model('Componente', CompoSchema)