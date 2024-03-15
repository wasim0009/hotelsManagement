// this is used for  json to object and vice versa     parse, stringify

// const jsonstring = '{"name":"khan","age":22}';
// const jsonobj = JSON.parse(jsonstring);
// console.log(jsonobj);
// const againjson= JSON.stringify(jsonobj);
// console.log(againjson)



// now Create Server with Express 
const express = require('express')
const app = express()   // app globally likhte hai ,  app ab Waiter ban gya hai  , usse sab le skte hai 

app.get("/",(req,res)=>{
    res.send("Welcome to my Hotel");
})
// app.get("/chicken",(req,res)=>{
//     res.send("chicken");
// })
// app.get("/mutton",(req,res)=>{
//     res.send("mutton");
// })
// app.post("/person",(req,res)=>{
//     res.send("Thankyou");
// })
app.listen(8080,()=>{
    console.log("Server connected to port number is 8080");
});