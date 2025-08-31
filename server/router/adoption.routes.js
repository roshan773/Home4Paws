const express = require("express")
const adoptionController = require("../controller/adoption.controller")
const adoptionRouter = express.Router()


adoptionRouter.get("/",adoptionController.test)

module.exports = adoptionRouter