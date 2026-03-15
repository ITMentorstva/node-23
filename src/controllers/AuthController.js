const UserService = require("../services/UserService");
const jwt = require("../utils/jwt");

module.exports = {

    login: async (req, res) => {

        const {email, password} = req.body;

        try {

            const user = await UserService.login(email, password);

            if(!user) return res.status(400).json({success: false, message: "Invalid credentials"});

            res.json({
                success: true,
                user,
                token: jwt.generateLoginToken({userId: user.id})
            });

        } catch (e) {
            res.status(500).json({success: false, message: "Something went wrong"})
        }
    },


};