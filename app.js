const express = require("express");
const app = express();

//Initial server request
app.get("/",(req,res)=>{
    res.status(200).json({Message:"Hello from server side 123456789 "})
})

app.post("/",(req,res)=>{
    res.status(200).json({Message:"You can post the data"})
})

const port = 3000;
app.listen(port,()=>{
    console.log(`App is running on port ${port}....`)
})