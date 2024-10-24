const { places } = require('../../db/placeSchema')
const {validateLocation,validateImages}=require('../../util/uploadFunc')
const {addPlaces}=require('../../db/placeFunc')
const {cloudinaryUploadImage}=require('../../cloud/initCloudinary')

function validateUploads(req,res,next) {
    console.log(req.user,req.id,'in validation')
    
    try{

        let data={}
        let files=req.files
        if(files===null) throw new Error('Insufficient Images')
        if(req.body.name && req.body.location){
            

            data=req.body
            console.log(data)
            for (let key in data) {
                data[key]=data[key].trim().toLocaleLowerCase()
            }
            
            validateLocation(data.location)
                .then((location)=>{                                // on succesfull location validation,
                
                    data.location=location
                    
                    return validateImages(files)                   // call validateImages as return of then
                })
                .then(()=>next())                                  // on successfull image validation
                .catch((err)=>res.status(400).send({msg:err.msg})) //catches error from both validateLocation and ValidataImages
            
        }
        else throw new Error('Insufficient Data')
    } catch (err) {
        console.log(err)
        if(err.message==='Insufficient Data') res.send({msg:err.message})
        else res.status(400).send('Oops! Something went wrong. Please try again.')
    }
    
}

function upload(req,res) {
    
        console.log('req.user',req.user,req.id)
        addPlaces(req.body,req.user,req.id,req.files)
        .then(msg=>{
            res.status(200).send({msg})
            
        })
        
        .catch(err=>res.status(400).send({msg:err}))
        
        
}
module.exports={
    validateUploads,
    upload
}