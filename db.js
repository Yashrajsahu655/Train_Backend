import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


const MONGO_URL = process.env.MONGO_URL;



const connectdb = async()=>{
    try{
        const db = await mongoose.connect(MONGO_URL)
        console.log("connected to DB");
        
    }
    catch(error){
        console.log("error while connecting to db",error);
        
    }
}


export default connectdb;
