const  app  = require ('./app.js');
const {connect,disconnect}  = require ('./config/Database_config.js');

connect()
.then(()=>{
    console.log('database connected from app')
})
.catch((err)=>{
    console.log(err.message)
})


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})