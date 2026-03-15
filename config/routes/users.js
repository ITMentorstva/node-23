
const router = require("express").Router();
const UserController = require("../../src/controllers/UserController");

router.get('/', UserController.getAll);
router.post("/", UserController.register);

module.exports = router;