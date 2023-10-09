const express = require('express');
const PORT = require('./config');
const client = require('../backend/src/database/index')
const routes = require('./src/routes/index')

const app = express();
app.use(express.json());

routes(app, client);

client.connect((err)=>{
    if(err){
        console.log("error", err)
    } else {
        console.log("connected");
    }
})

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });