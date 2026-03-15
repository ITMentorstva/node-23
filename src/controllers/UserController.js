
const prisma = require("../../prismaClient");
const UserService = require("../services/UserService");
const prismaStatusCodes = require("../../config/prismaStatusCodes");
const jwt = require("../utils/jwt");

module.exports = {

    register: async (req, res) => {

        const {name, email, password} = req.body;

        try {
            const user = await UserService.register(name, email, password);
            res.json({
                user,
                token: jwt.generateLoginToken({userId: user.id})
            });
        } catch (e) {
            if(e.code === prismaStatusCodes.UNIQUE_CONSTRAINT_FAILED) throw new Error("Email already exists");
            res.status(500).json({success: false, message: "Something went wrong"})
        }
    },

    getAll: async (req, res) => {
        res.json({
            users: await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true
                }
            })
        })
    }

};