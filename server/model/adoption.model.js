const mongoose = require("mongoose")

const adoptionSchema = mongoose.Schema({
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        required: true
    },

    adopter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    adopterContact: {
        type: String,
        required: true
    },

    adoptionDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
})

const Adoption = mongoose.model("adoption", adoptionSchema)

module.exports = Adoption