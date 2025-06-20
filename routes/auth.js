const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.get("/login", authController.get_login_form);
router.get("/signup", authController.get_signup_form);

module.exports = router;
