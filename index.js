
const express = require("express");
const app = express();

const addRoleToUsers = require("src/scripts/addRoleToUsers");

const authRouter = require("./config/routes/auth");
const userRouter = require("./config/routes/users");
const eventRouter = require("./config/routes/events");

app.use(express.json());

app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
