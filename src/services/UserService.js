
const prisma = require("../../prismaClient");
const bcrypt = require("bcryptjs");

module.exports = {

    register: async (name, email, password) => {
        const hashed = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: {name, email, password:hashed},
            select: {
                id: true,
                email: true,
                name: true
            }
        })
    },

    login: async (email, password) => {

        const user = await prisma.user.findUnique({
            where: {email},
            select: {
                id: true,
                email: true,
                name: true,
                password: true
            }
        });

        if(!user) return null;

        const validPassword = await bcrypt.compare(password, user.password);
        return validPassword ? user : null;

    }

};