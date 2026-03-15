const UserService = require("../services/UserService");
const prismaStatusCodes = require("../../config/prismaStatusCodes");

module.exports = {

    register: async (req, res) => {

        const {name, email, password} = req.body;

        try {
            const user = await UserService.register(name, email, password);
            res.json(user);
        } catch (e) {
            if(e.code === prismaStatusCodes.UNIQUE_CONSTRAINT_FAILED) throw new Error("Email already exists");
            res.status(500).json({success: false, message: "Something went wrong"})
        }
    },

    login: async (req, res) => {

        const {email, password} = req.body;

        try {

            const user = await UserService.login(email, password);

            if(!user) return res.status(400).json({success: false, message: "Invalid credentials"});

            res.json({
                success: true,
                user
            });

        } catch (e) {
            res.status(500).json({success: false, message: "Something went wrong"})
        }
    },


};