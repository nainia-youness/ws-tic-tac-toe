const express = require('express')
const morgan= require('morgan')
const cors=require('cors')
const swaggerJsDoc=require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express');
const app = express();
const expressWs = require('express-ws')(app);
const user_route=require('./routes/user.js')
const websocket_route=require('./routes/websocket.js')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env' });
}


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }))// to support URL-encoded bodies 



/**
 * @swagger
 * components:
 *  schemas:
 *      Book:
 *          type: Object
 *          required:
 *              - title
 *              - author
 *          properties:
 *              type: string
 *              description: dqsdsqd
*/

const options={
    definition:{
       openapi:'3.0.0',
       info:{
           title:'Tic Tac Toe API',
           version:'1.0.0',
           description:'a simple nodejs api that communicates with a websocket'
       },
       servers:[
           {
               url:`http://localhost:4000/`
            }
       ]
    },
    apis:['./routes/*.js']
}


const swaggerSpec= swaggerJsDoc(options)
app.use('/api_docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))


app.use(morgan('dev'));
app.use(cors());


app.use('/websocket',websocket_route)
app.use('/api',user_route)


module.exports = app





























