import express from "express"
import config from "config"






const app = express()
const PORT = config.get('port') || 5000


app.listen(5000, () =>{
    console.log("this is app is running");  
})