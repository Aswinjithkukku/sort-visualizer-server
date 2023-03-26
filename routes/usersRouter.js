const router = require("express").Router();

const {
   doSignup,
   doLogin,
   getAccount,
   getAllUsers,
   deleteUser,
} = require("../controllers/usersController");
const userAuth = require("../middlewares/userAuth");

router.post("/signup", doSignup);
router.post("/login", doLogin);
router.get("/my-account", userAuth, getAccount);
router.get("/admin/all", getAllUsers);
router.delete("/admin/:id/delete", deleteUser);

module.exports = router;
