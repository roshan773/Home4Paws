const express = require("express")
const mongoose = require("mongoose")
const Pet = require("../model/pet.model")
const Adoption = require("../model/adoption.model")


const adoptionController = {
    test: (req, res) => {
        res.status(200).json({ message: "Adoption rout is working" })
    },

    getPetDetail: async (req, res) => {
        const { petId } = req.params

        try {
            const pet = await Pet.findById(petId).select("name petType breed vaccinated")

            if (!pet) {
                res.status(400).json({ message: "Pet does not found" })
            }

            return res.status(200).json(pet)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error })
        }
    },

    create: async (req, res) => {
        const { petId } = req.params
        const { adopter, adopterContact } = req.body

        try {
            if (!mongoose.Types.ObjectId.isValid(petId)) {
                return res.status(400).json({ message: "Invalid pet id" })
            }

            const pet = await Pet.findById(petId)
            if (!pet) {
                return res.status(404).json({ message: "Pet Not Found", pet })
            }

            const AdoptionPet = await Adoption.findOne({ pet: petId })
            if (AdoptionPet) {
                return res.status(409).json({ message: "Pet has been adopted already" })
            }

            const adoption = await Adoption.create({
                pet: petId,
                adopter,
                adopterContact
            })

            pet.adopted = true
            pet.save()
            req.io.emit("Pet Adopted")
            return res.status(200).json({ message: "Adoption of Pet Done" , adoption, pet})
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    }

}

module.exports = adoptionController