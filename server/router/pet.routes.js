const express = require("express")
const petController = require("../controller/pet.controller")
const petRouter = express.Router()

petRouter.get("/test", petController.test)
petRouter.post("/", petController.create)
petRouter.post("/filter", petController.filter)
petRouter.post("/search", petController.search)
petRouter.patch("/:id", petController.update)

module.exports = petRouter