const mongoose = require("mongoose")

const adoptionSchema = mongoose.Schema({
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        required: true,
        immutable: true
    },

    adopter: {
        type: String,
        required: true,
        immutable: true
    },

    adopterContact: {
        type: String,
        required: true,
        immutable: true
    },

    adoptionDate: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
    timestamps: true,
})

const Adoption = mongoose.model("adoption", adoptionSchema)

module.exports = Adoption