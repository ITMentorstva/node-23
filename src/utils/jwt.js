
const jwt = require("jsonwebtoken");

module.exports = {

    generateLoginToken: (payload) => {
        return jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );
    }

};