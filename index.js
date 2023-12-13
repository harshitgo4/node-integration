require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const path = require('path');
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
//console.log('env',process.env.DB_PASSWORD)

//db connection
async function main() {
  try {
    await mongoose.connect('mongodb+srv://harshitgoyal1234567890:IrkgmlRBmiLQtPVw@cluster0.ghcazld.mongodb.net/ecommercetest?retryWrites=true&w=majority');
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}
main();
//Schema


//bodyParser
server.use(cors());
server.use(express.json());
server.use(morgan('default'));
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
server.use('/products',productRouter.router);
server.use('/users',userRouter.router);
server.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'))
})




server.listen(process.env.PORT, () => { 
  console.log('server started');
});
