const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.get("/login", authController.get_login_form);
router.get("/register", authController.get_register_form);
router.post("/register", authController.post_create_user);
router.post("/login", authController.post_auth_user);
router.get("/logout", authController.get_logout);

module.exports = router;
