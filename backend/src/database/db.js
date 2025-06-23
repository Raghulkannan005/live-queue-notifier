

import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const db = await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to Database :", db.connection.name);
    }
    catch(err){
        console.log(err);
        throw new Error(err);
    }
}

export default connectDB;