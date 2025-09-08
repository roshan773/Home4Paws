const express = require("express")
const adoptionController = require("../controller/adoption.controller")
const adoptionRouter = express.Router()


adoptionRouter.get("/",adoptionController.test)
adoptionRouter.get("/petId/:id", adoptionController.getPetDetail)
adoptionRouter.post("/:petId", adoptionController.create)

module.exports = adoptionRouter