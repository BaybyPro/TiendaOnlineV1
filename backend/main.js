const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')

require('./db')
//JSON

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//middlweares
app.use(morgan('dev'));
app.use(require('./src/routers'))
app.listen(3000);
console.log('server on port', 3000)