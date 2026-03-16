import jsonWebToken from "jsonwebtoken";


export const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;

    try {

        if(!authHeader) return res.status(401).json({message: "No token provided"});
        const token = authHeader.split(" ")[1];
        const payload = jsonWebToken.verify(token, process.env.JWT_SECRET);

        req.userId = payload.userId;

        next();

    } catch (e) {
        return res.status(401).json({message: "Invalid or expired token"});
    }

}
