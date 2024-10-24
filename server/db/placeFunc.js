const { cloudinaryUploadImage } = require('../cloud/initCloudinary');

const users= require('./userSchema')

async function addPlaces(placeData,userEmail,userObjId,imageFiles) {
    const {name,location,desc,town,city,country,free,verified,note}=placeData;
    
    return new Promise((resolve, reject) => {
        
        // const place = new places({
        //     name,location,desc,town,city,country,free,verified,note
        // });
        users.findOneAndUpdate(
            {email:userEmail},
            {$push:{
                places:[{name,location,desc,town,city,country,free,verified,note}]
            }},
            {new:true}
        )
            .then((msg)=>{
                placeId=msg.places.at(-1)
                
                return cloudinaryUploadImage(imageFiles)
                
            })
            .then(urlArray=>{
                //uploading links to Database
               console.log(urlArray)
               return users.updateOne(
                {email : userEmail},
                {
                    $push:{
                        "places.$[elemX].photo":{
                            "$each":urlArray
                        }
                    }
                },
                {
                    arrayFilters:[
                        {
                            "elemX._id":placeId._id
                        }
                    ]
                }
               )
            })
            .then(msg=>{
                console.log(msg)
                resolve(`Added place ${name} by user ${userEmail}`)
            })
            .catch((err)=>{
                console.log(err)
                reject(`Couldn't add place. Try again`)
            })
    })
}

module.exports={
    addPlaces
}