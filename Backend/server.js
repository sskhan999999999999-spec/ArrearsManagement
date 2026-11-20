import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'


dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database Connected Successfully");
    
})
.catch((err)=>{
    console.log("Error While Connected Database" , err);
    
})

const Port = process.env.PORT || 5000

app.listen(Port,()=>{
    console.log(`Server Is Running At Port ${Port}`);
    
})