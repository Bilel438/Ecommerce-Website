import mongoose from "mongoose";


const categorySchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        maxLenght : 32 ,
        unique : true ,
    }
})


export default mongoose.model("Category" , categorySchema);