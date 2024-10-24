const cryptPwd = require('../util/pwdFunc')
const users=require('./userSchema')


async function createUser(email, password) {
    const finalPassword = await cryptPwd.encryptPwd(password)
    return new Promise((resolve, reject) => {
        const user = new users({
            email: email.toLowerCase(),
            password: finalPassword,
        })
        user.save()
            .then((msg) => {
                console.log(msg)
                resolve(`Added user with email ${email}`)
            })
            .catch((err) => {
                console.log(err)
                reject(`Couldn't Register. Try again`)
            })
    })
}

async function userExists(email) {
    let user=await users.find({email:email})
    return new Promise((resolve, reject) => {
        if(user.length===0) resolve(true) 
        else reject({msg:'User Exists',id:user[0]._id,email:user[0].email})
    })
}

const loginCheck=async (email,password)=>{
    const user=await users.find({email})
        return new Promise(async (resolve, reject) => {
            if(user.length!==0){
                console.log(user)
                cryptPwd.decryptPwd(password,user[0].password).then(res=>{
                    console.log(res)
                    if(res) {
                        console.log("pass correct")
                        resolve(true)
                    }
                    else{
                        console.log("nopes")
                        reject('Wrong Password')
                    }
                })
            }else reject('Email not Registered. Please Register')  
        })
    
}

module.exports={
    createUser, userExists, loginCheck
}