function validateLocation(location) {
    console.log(location)
    return new Promise((resolve, reject) => {
        try {
            location=JSON.parse(location)
            if((location.lat<=90.0000 && location.lat>=-90.0000)&&(location.lng<=180.0000 && location.lng>=-180.0000)){
                resolve({lat:location.lat.toString(),lng:location.lng.toString()})
            }else throw new Error('Location data out of permissible range')
        } catch (error) {
            console.log('Location data not correct')
            console.log(error)
            
            reject({error:true,msg:'Location data not correct'})
        }
        
    })
}

function validateImages(images) {
    const allowedFileTypes=['image/png','image/jpg','image/jpeg','image/gif','image/webp']
    return new Promise((resolve, reject) => {
            for (const image in images) {
                
                if(images[image].size>=1000000) reject({error:true,msg:'Image size larger than 1MB'})
                else{
                    if(!allowedFileTypes.includes(images[image].mimetype)){
                        console.log(false,images[image].name,images[image].mimetype)
                        return reject({error:true,msg:'File type not accepted'})
                    }
                }
                console.log(true,images[image].name,images[image].mimetype)
            }
            
            resolve({err:false,msg:'Succes'})
            
    })

}

let prepareImage=(image)=>{
    return image.name
}


module.exports={
    validateImages,
    validateLocation,
    prepareImage
}