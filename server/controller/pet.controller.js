const express = require("express")

const Pet = require("../model/pet.model")

const petController = {
    test: (req, res) => {
        res.status(200).json({ message: "Test routes is working" })
    },

    create: async (req, res) => {
        const { name, petType, breed, age, description, location, vaccinated, image, price } = req.body

        try {
            if (!name || !petType || !breed || age === undefined || description === undefined || !location || !vaccinated || !image || !price) {
                return res.status(422).json({ mesage: "All fields are required, Something is missing " })
            }

            let newpet = await Pet.create({ ...req.body })
            req.io.emit("Pet Added", newpet)
            return res.status(200).json({ message: `${name} data added successfully`, newpet })
        } catch (error) {
            return res.status(500).json({ message: "Internal server Error", error: error.message })
        }
    },

    filter: async (req, res) => {
        try {
            const { adopted } = req.body

            let filter = {}
            if (adopted !== undefined) {
                filter.adopted = (adopted === true || adopted === "true")
            }

            let pets = await Pet.find(filter)
            return res.status(200).json(pets)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error })
        }
    },

    search: async (req, res) => {
        try {
            const { query } = req.body

            if (!query) {
                return res.status(400).json({ message: "query is required" })
            }

            const pets = await Pet.find({
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { petType: { $regex: query, $options: "i" } },
                    { breed: { $regex: query, $options: "i" } },
                    { location: { $regex: query, $options: "i" } }
                ]
            })

            return res.status(200).json(pets)
        } catch (error) {
            return res.status(200).json({ message: "Internal Server error", error })
        }
    },

    getById: async (req, res) => {

        try {
            let pets = await Pet.find()
            return res.status(200).json({message: "All pet data fetched", pets})
        } catch (error) {
            return res.status(500).json({message: "Unable to fetch", error: error.message})
        }
    },

    update: async (req, res) => {
        const { id } = req.params

        try {
            let pets = await Pet.findByIdAndUpdate(id, { new: true })
            return res.status(200).json({ message: " data updated", pets })
        } catch (error) {
            return res.status(500).json({ mesage: "Internal server error", error: error.message })
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params

            let pets = await Pet.findByIdAndDelete(id)
            return res.status(200).json({ message: " data updated", pets })
        } catch (error) {
            return res.status(500).json({ mesage: "Internal server error", error: error.message })
        }
    }
}

module.exports = petController