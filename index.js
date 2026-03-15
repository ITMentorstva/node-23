
const express = require("express");
const prisma = require("./prismaClient");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        test: "Yes"
    })

});


app.listen(3000);
