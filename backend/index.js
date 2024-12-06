require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");
const authRouter = require("./routes/auth");
const itemRouter = require("./routes/item");
const orderRouter = require("./routes/order");
const chatRoute = require("./routes/chat");
const { sequelize } = require("./models");

const cors = require("cors");
const { createServer } = require("http");
const webServer = require("./socket");
const sse = require("./sse");

const path = require("path");
const app = express();
app.use(cors());
const server = createServer(app);
passportConfig();
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("data base연결됨.");
  })
  .catch((e) => {
    console.error(e);
  });
app.set("port", process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: { httpOnly: true, secure: false },
});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);
app.use("/item", itemRouter);
app.use("/order", orderRouter);
app.use("/home", chatRoute);
server.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 서버 대기 중`);
});
webServer(app, server, sessionMiddleware, passport);
sse(app, server);
