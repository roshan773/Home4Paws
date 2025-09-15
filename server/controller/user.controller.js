const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../model/user.model")

const userController = {
    test: async(req, res) => {
        return res.status(200).json({message: "Test Routes is working"})
    },

    register: async(req, res) => {
        const {name, email, password} = req.body

        try {
            if(!name || !email || !password){
                return res.status(409).json({message: "All fields are required"})
            }

            const isExist = await User.findOne({email})
            if(isExist){
                return res.status(409).json({message: "This field is already present", isExist})
            }

            const haspassword = await bcrypt.hash(password, 5)
            const newuser = await User.create({
                name,
                email,
                password: haspassword
            })

            return res.status(200).json({message: `${name} registered Successfully`})
        } catch (error) {
            return res.status(500).json({message: "Unable to register, Try again", error})
        }
    }
}


module.exports = userController