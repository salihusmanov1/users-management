const express = require("express");
const UsersController = require("../controller/usersController");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authenticate, UsersController.getUsers);
router.post("/block", authenticate, UsersController.blockUsers);
router.post("/unblock", authenticate, UsersController.unblockUsers);
router.post("/delete", authenticate, UsersController.deleteUsers);

module.exports = router;