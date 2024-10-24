const jwt=require('jsonwebtoken')
const users = require('../../db/userFunc')
const dotenv=require('dotenv').config()

let registerFunc = async (req, res) => {

    users.userExists(req.body.email)
    .then(()=>users.createUser(req.body.email, req.body.password))

    .then((val) =>res.status(200).send({ msg: val}),(err) => {console.log(err);res.status(400).send({ msg: err.msg })})
    
    .catch(()=>res.status(400).send({msg:'Email already registered'}))

}

const loginFunc=async (req,res)=>{
    users.loginCheck(req.body.email,req.body.password)

    .then(()=>generateToken(req.body.email))

    .then(token=>res.send({token}))

    .catch(err=>res.send({msg:err}))
}

const generateToken=async(email)=>{
    return new Promise((resolve, reject) => {
        jwt.sign({email},process.env.SecretKey,{
            algorithm:'HS384',
            expiresIn:'1h'
        },(err,token)=>{
            if(!err) resolve(token)
            else{
                console.log(err)
                reject('Unable to Login. Try Again')
            }
        })
    })
}

const verifyToken=(req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(' ')[1]
    if(!token) return res.send({msg:'Authentication token missisng'})
    jwt.verify(token,process.env.SecretKey,(err,result)=>{
        if(!err) {
            console.log('This is verifyToken ',result)
            users.userExists(result.email).catch((result)=>{
                console.log("this too in verify token->",result)
                req.user=result.email
                req.id=result.id
                next()
            })

            }
        else return res.send(err)
    })
    }
    
}
module.exports = {
    registerFunc,
    loginFunc,
    verifyToken
}