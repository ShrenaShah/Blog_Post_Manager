const { Router } = require("express");
const User = require("../models/user");

const upload = require("../middlewares/upload");

const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Invalid email or password",
    });
  }
});

router.post("/signup", upload.single("profileImage"), async (req, res) => {
  const { fullName, email, password } = req.body;
  let profileImageURL = "images/user_avatar.png";
  if (req.file) {
    profileImageURL = `images/${req.file.filename}`;
  }
  await User.create({
    fullName,
    email,
    password,
    profileImageURL,
  });
  return res.redirect("/");
});

router.get("/logout", async (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
