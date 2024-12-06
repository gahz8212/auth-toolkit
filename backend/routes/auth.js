const express = require("express");
const router = express.Router();
const passport = require("passport");
const { User } = require("../models");
const bcrypt = require("bcrypt");
router.post("/join", async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(400).json("이미 등록된 이메일 입니다.");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({ email, name, password: hash });
    return res.status(200).json("join_ok");
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/login", async (req, res) => {
  passport.authenticate("local", (authError, user, info) => {
    try {
      if (authError) {
        throw new Error(authError);
      }
      if (!user) {
        throw new Error(info.message);
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          throw new Error(loginError);
        } else {
          return res.status(200).json("login_ok");
        }
      });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  })(req, res);
});
router.get("/check", async (req, res) => {
  console.log("backend");
  try {
    const { id, name, rank } = req.user;

    let expires = Date.now() + 1000 * 60 * 60;
    req.session.cookie.expires = expires;
    req.app
      .get("io")
      // .of("/room")
      .to("chat")
      .emit("chat", {
        chat: `${req.user.name}님이 로그인 하셨습니다.`,
        name: "system",
      });

    return res.status(200).json({
      auth: { id, name, rank },
      expires,
    });
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/logout", async (req, res) => {
  req.app
    .get("io")
    .to("chat")
    .emit("chat", {
      chat: `${req.user.name}님이 로그아웃 하셨습니다.`,
      name: "system",
    });
  req.logout((e) => {
    if (e) {
      return;
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid", {
        httpOnly: true,
        secure: false,
        path: "/",
      });
      return res.send("logout_ok");
    });
  });
});
router.post("/extends", (req, res) => {
  console.log("extends");

  req.session.touch();

  let expires = Date.now() + 1000 * 60 * 60;
  req.session.cookie.expires = expires;
  res.status(200).json(expires);
});
module.exports = router;
