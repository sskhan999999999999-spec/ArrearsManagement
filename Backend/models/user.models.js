import mongoose,{mongo, Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({

    name:{
        type: String,
        required: true,
        trim: true,
    },

    phone:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    }
},{timestamps:true})

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(password,10)

})

userSchema.methods.isPasswordCorrect = async (password)=>{
    return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User",userSchema);v