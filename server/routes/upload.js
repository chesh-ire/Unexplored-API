const route=require('../server').app
const {validateUploads,upload}=require('./middlewares/uploadMiddlewares')
const {verifyToken}=require('../util/auth/authFunc')

route.use(verifyToken)
//upload process
/*
    -> Login/authorization for upload need not have login cookie stored as of now because it is an API
    -> upload route is authorized by adding a bearer token
*/
route.put('/upload',validateUploads,upload)

module.exports={
    route
}

