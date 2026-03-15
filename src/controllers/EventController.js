
const prisma = require("../../prismaClient");
const prismaStatusCodes = require("../../config/prismaStatusCodes");

module.exports = {

    create: async (req, res) => {

        const { title, description, ticket_price, due_date } = req.body;

        if(!title || !description || !ticket_price || !due_date) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const event = await prisma.event.create({
            data: {
                title,
                description,
                ticket_price: Number(ticket_price),
                due_date: new Date(due_date)
            },
        });

        return res.status(201).json(event);

    },

    getAll: async (req, res) => {
        res.json({
            events: await prisma.event.findMany()
        });
    },

    update: async (req, res) => {

        try {
            const { id } = req.params;
            const { title, description, ticket_price, due_date, status} = req.body;

            const dataToUpdate = {};

            if(title !== undefined) dataToUpdate.title = title;
            if(description !== undefined) dataToUpdate.description = description;
            if(status !== undefined) dataToUpdate.status = status;
            if(ticket_price !== undefined) dataToUpdate.ticket_price = Number(ticket_price);
            if(due_date !== undefined) dataToUpdate.due_date = new Date(due_date);

            const updatedEvent = await prisma.event.update({
                where: { id },
                data: dataToUpdate
            });

            res.json(updatedEvent);
        } catch(e) {
            if(e.code === prismaStatusCodes.ROW_NOT_FOUND) throw new Error("This ID doesn't exist in our database");
            res.status(500).json({success: false, message: "Something went wrong"});
        }

    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            await prisma.event.delete({
                where: { id }
            });

            res.json({
                success: true,
                message: "Event has been deleted"
            });
        } catch(e) {
            if(e.code === prismaStatusCodes.ROW_NOT_FOUND) throw new Error("This ID doesn't exist in our database");
            res.status(500).json({success: false, message: "Something went wrong"});
        }
    },

};