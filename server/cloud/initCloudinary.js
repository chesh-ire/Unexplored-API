const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CloudinaryCloudName,
    api_key: process.env.CloudinaryApiKey,
    api_secret: process.env.CloudinaryApiSecret,
    secure: true
})


function cloudinaryUploadImage(files) {
    let imageUrls=[]
    let numOfImages=Object.keys(files).length
    return new Promise((resolve, reject) => {
        for (const file in files) {
            // data:${req.files.brush.mimetype};base64,${buf.toString('base64')}
            
            let data=`data:${files[file].mimetype};base64,${files[file].data.toString('base64')}`
            cloudinary.uploader.upload(data, {
                use_filename: true,
                unique_filename: true,
                overwrite: false,
                async: false
            })
            .then(result=>{
                console.log(2101)
                imageUrls.push(result.secure_url)
                console.log(imageUrls.length,numOfImages)
                if(imageUrls.length===numOfImages) resolve(imageUrls)
                
            })
            .catch(err=>{
                console.log(400,'Unable to upload\n',err)
                reject({err:true,msg:'Unable to upload'})
            })
        }
    })
}


module.exports={
    cloudinaryUploadImage,

}

