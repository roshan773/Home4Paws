const mongoose = require("mongoose")

const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    petType: {
        type: String,
        required: true
    },

    breed: {
        type: String,
        required: true
    },

    age: { 
        type: Number,
        required: false
    },

    description: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    vaccinated: {
        type: Boolean,
        required: true,
    },

    image: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    adopted: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
})

const Pet = mongoose.model("Pet", petSchema)

module.exports = Pet