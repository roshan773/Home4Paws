const express = require("express")
const petController = require("../controller/pet.controller")
const petRouter = express.Router()

petRouter.get("/test", petController.test)
petRouter.post("/", petController.create)

module.exports = petRouter