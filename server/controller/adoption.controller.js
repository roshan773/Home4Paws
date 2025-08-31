const express = require("express")


const adoptionController = {
    test: (req, res) => {
        res.status(200).json({message: "Adoption rout is working"})
    }
}

module.exports = adoptionController