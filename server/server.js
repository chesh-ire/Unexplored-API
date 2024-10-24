const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
const port=process.env.PORT 

const fileUpload=require('express-fileupload')
app.use(fileUpload())

app.use((req, res, next) => {
    handleError(express.json(), req, res, next);
});

app.listen(port,()=>{
    console.log(`Listening on ${port}...`)
})


function handleError(middleware, req, res, next) {
    middleware(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(400).send({msg:"Format not correct"}); // Bad request
      }
      next();
    });
  }
  
  

module.exports={
    app
}