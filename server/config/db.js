import mongoose from "mongoose"; 
//console.log('it didt'); 

const connectDB = async() => { 
    try{ 
        //fill in the MONGO_URI connection string in the env file
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    }
    catch(error){ 
        console.log("Database connection failed",error);
        process.exit(1);
    }
};

export default connectDB;