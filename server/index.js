const express = require("express")
const http = require("http")
const cors = require("cors")
const connecttoDb = require("./utils/Db")
const petRouter = require("./router/pet.routes")
const adoptionRouter = require("./router/adoption.routes");
const { Server } = require("socket.io")
require("dotenv").config()
const app = express()
let PORT = process.env.PORT || 3000
app.use(express.json())

app.use(cors({
    origin: "*"
}))


app.get("/", (req, res) => {
    res.send("ALL ROUTES IS WORKING")
})

app.use("/api/pet/", petRouter)
app.use("/api/adoption/", adoptionRouter)

// ----------------Socket.io----------------
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.set("io", io)



server.listen(PORT , async() => {
    try {
        console.log("Server is running");
        connecttoDb()
    } catch (error) {
        console.log("Internal server error", error)
    }
})