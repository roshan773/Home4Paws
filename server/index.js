const express = require("express")
const connecttoDb = require("./utils/Db")
const petRouter = require("./router/pet.routes")
const adoptionRouter = require("./router/adoption.routes");
require("dotenv").config()
const app = express()
let PORT = process.env.PORT || 3000
app.use(express.json())


app.get("/", (req, res) => {
    res.send("ALL ROUTES IS WORKING")
})

app.use("/api/pet/", petRouter)
app.use("/api/adoption/", adoptionRouter)







app.listen(PORT , async() => {
    try {
        console.log("Server is running");
        connecttoDb()
    } catch (error) {
        console.log("Internal server error", error)
    }
})