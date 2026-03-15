
const express = require("express");
const app = express();

const authRouter = require("./config/routes/auth");

app.use(express.json());

app.use("/api", authRouter);


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
