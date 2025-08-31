const mongoose = require("mongoose")

const adoptionSchema = mongoose.Schema({
    petname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        required: true
    },

    adopterName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    adopterContact: {
        type: String,
        required: true
    },

    adoptionDate: {
        type: String,
        default: () => {
            let today = new Date()
            return `${today.getDate()} - ${today.getMonth()} - ${today.getFullYear()}`
        }
    }
}, {
    timestamps: true,
})

const Adoption = mongoose.model("adoption", adoptionSchema)

module.exports = Adoption