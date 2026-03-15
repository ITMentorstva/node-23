
const router = require("express").Router();
const EventController = require("../../src/controllers/EventController");


router.get('/', EventController.getAll);
router.post('/', EventController.create);
router.put('/:id', EventController.update);
router.delete('/:id', EventController.delete);


module.exports = router;