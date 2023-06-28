const { Router } = require("express");

const {
  registerUser,
  loginUser,
  getLoginPage,
  getRegisterPage,
  logout,
} = require("./../controller/auth.controller");
const router = Router();

router.route("/signup").get(getRegisterPage).post(registerUser);

router.route("/signin").get(getLoginPage).post(loginUser);
router.get("/logout", logout);
module.exports = router;
