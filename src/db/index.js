import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI1}/${DB_NAME}`);
        console.log(`MongoDB Connected !! DB Host ${connectionInstance.connection.host}`);
        

    }catch(err){
        console.error("MONGODB CONNECTION FAILED ",err)
        process.exit(1)
    }
}

export default connectDB