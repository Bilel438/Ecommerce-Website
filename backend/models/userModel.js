import mongoose from "mongoose";


const favoriteProductsSchema = new mongoose.Schema({
  productId : {type : Array, ref : "Product" , required : true},
}, {timestamps : true});

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
     required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    favoriteProducts: {
      favoriteProductsSchema
    }

  },
  { timestamps: true }
); 


const User =  mongoose.model("User", userSchema);


 
export default User;


