const route=require('../server').app
const validateRegistration=require('../util/pwdFunc').validateRegistration
const {registerFunc,loginFunc,verifyToken}=require('../util/auth/authFunc')


route.post('/register',validateRegistration,registerFunc)


route.post('/login',validateRegistration,loginFunc)


module.exports=route