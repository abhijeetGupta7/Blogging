const mongoose=require("mongoose");
const { MONGO_URI } = require("./server-config");

async function connecToDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to Database Successfully");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports={
    connecToDB
}