import mongoose from "mongoose";

const infoSchema=new mongoose.Schema({
    cp:{
        type:Number,
        required:true
    },
    cw:{
        type:Number,
        required:true
    }
})

// mongoose.model('Info') || 
const Info=mongoose.models.Info ||mongoose.model('Info',infoSchema);
export default Info;