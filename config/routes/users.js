
const router = require("express").Router();
const UserController = require("../../src/controllers/UserController");
const authMiddleware = require("../../src/middlewares/authMiddleware");

router.get('/', UserController.getAll);
router.post('/', UserController.register);

router.get('/me', authMiddleware.authenticate, UserController.getUser);

module.exports = router;