const mongoose = require("mongoose");

// Function to connect with database 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongo Db is connected");
    } catch (error) {
        console.log(error);
    }  
};

module.exports = connectDB;