const { default: mongoose } = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/login4',{

})
.then(db => console.log('data base is connected'))
.catch(err=> console.log(err));