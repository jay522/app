import mongoose from "mongoose"
// const DB=process.env.DATABASE;
const main=async ()=>{
    mongoose.connect("mongodb+srv://priya:33priya1234@cluster0.hqgcyrw.mongodb.net/blog?retryWrites=true&w=majority"
        )
    console.log("Database connected...")
}

export default main;
// mongodb+srv://priya:33priya1234@cluster0.hqgcyrw.mongodb.net/blog?retryWrites=true&w=majority
// mongodb://127.0.0.1:27017/blog

// const DB=process.env.DATABASE;

// mongoose.connect(DB,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true,
//     useFindAndModify:false
// }).then(()=>{
//     console.log("connection successful");
// }).catch((err)=>{console.log("no connection");})