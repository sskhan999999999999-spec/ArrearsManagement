import { User } from "../models/user.models";
import validator from "validator"

export const userRegistration = async(req,res)=>{
    try {
        const {name,phone,email,password,confirmPassword} = req.body;

        if(!name || !phone || !email || !password || !confirmPassword){
            res.status(401).json({
                message: "All Fields Are Required",
            })
        }
    
        if(password != confirmPassword ){
            res.status(401).json({
                message: "password is not matching with confirm password",
            })
        }
        if(!validator.isEmail(email)){
            res.status(401).json({
                message: "Your Email Is Not Right",
            })
        }
    
        if(password.length < 8){
            res.status(401).json({
                message: "Please Atleast 8 Charactets"
            })
        }
    
        const existingUser = await User.findOne({email})
    
        if(existingUser){
            res.staus(401).json({
                message: "User with This Email Already Exist",
            })
        }
        name = validator.escape(name.trim())
        email = validator.normalizeEmail(email)
    
        const user = await User.create({
            name,
            phone,
            email,
            password,
        })
    
        res
        .status(201)
        .json({
            message: "User Created Successfully",
            user,
        })
    } catch (error) {
        res
        .status(500)
        .json({
            message: "Error while Creating User"
        })
    }


}