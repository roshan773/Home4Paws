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

    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },

    image: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    adopted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Pet = mongoose.model("Pet", petSchema)

module.exports = Pet