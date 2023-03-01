import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    loc:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    head:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    img:{
        type:Object,
        required:true
    }
    
})
// mongoose.model('Data') ||
const Data= mongoose.models.Data || mongoose.model('Data',postSchema);
export default Data;