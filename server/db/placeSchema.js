const mongoose=require('mongoose')
const placeSchema = new mongoose.Schema({
    name: String,
    location:{
        lat:String,
        lng:String
    },
    photo:Array,
    desc:String,
    town:String,
    city:String,
    country:String,
    free:Boolean,
    verified:Boolean,
    note:String
});

module.exports={
    placeSchema
}