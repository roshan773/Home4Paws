const express = require("express")
const Pet = require("../model/pet.model")

const petController = {
    test: (req, res) => {
        res.status(200).json({ message: "Test routes is working" })
    },

    create: async (req, res) => {
        const { name, petType, breed, age, description, location, vaccinated, image, contact } = req.body

        try {
            if (!name || !petType || !breed || !age || !description || !location || !vaccinated || !image || !contact) {
                return res.status(422).json({ mesage: "All fields are required, Something is missing " })
            }

            let newpet = await Pet.create({ ...req.body })
            return res.status(200).json({ message: "Pet Data added Successfully", newpet })
        } catch (error) {
            return res.status(500).json({ message: "Internal server Error", error: error.message })
        }
    },

    filter: async (req, res) => {
        try {
            const { adopted } = req.body

            let filter = {}
            if (adopted === true) {
                filter.adopted = (adopted === true || adopted === "true")
            }
            else {
                filter.adopted = (adopted === false || adopted === "false")
            }

            let pets = await Pet.find(filter)
            return res.status(200).json(pets)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error })
        }
    }

}

module.exports = petController