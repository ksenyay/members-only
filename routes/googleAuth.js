const { Router } = require("express");
const router = Router();
const googleAuthController = require("../controllers/googleAuthController");

router.get("/auth/google", googleAuthController.get_google_auth);
router.get("/auth/google/redirect", googleAuthController.get_google_redirect);

module.exports = router;
