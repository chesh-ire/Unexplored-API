const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const dbLink=process.env.DbLink

const conn=mongoose.connect(dbLink,{
    autoIndex:true,
    dbName:process.env.DbName
})
conn.then(()=>{
    console.log(`DB Connected`)
})
conn.catch((err)=>{
    console.log(err)
})

module.exports=conn