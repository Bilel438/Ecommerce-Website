import jwt from "jsonwebtoken";


const createToken = (res,userID) => {

    const token = jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: "1d"});


    res.cookie('jwt',token ,{httpOnly:true , secure: process.env.NODE_ENV !== 'development', samesite:'strict' , maxAge: 30 * 24 * 60 * 60 * 1000});



    return token;
    
};


export default createToken ;