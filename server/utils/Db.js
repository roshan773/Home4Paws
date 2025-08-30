const mongoose = require("mongoose")
require("dotenv").config()

const connecttoDb = async() => {
    try {
        await mongoose.connect(process.env.Mongo_url + "Home4Paws")
        console.log("Connected to Database")
    } catch (error) {
        console.log("Unable to connect")
    }
}

module.exports = connecttoDb