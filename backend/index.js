import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import MahasiswaRoute from "./routes/MahasiswaRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import KeuanganRoute from "./routes/KeuanganRoute.js";
import InformasiRoute from "./routes/InformasiRoute.js";
import KamarRoute from "./routes/KamarRoute.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  await db.sync();
})();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: true,
      sameSite: "none", // Ensure cookies are sent cross-site
    },
  })
);

app.use(
  cors({
    origin: "https://asrama-sulteng.vercel.app",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("public"));

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  req.userId = user.id;
  req.role = user.role;
  next();
};

// Middleware untuk admin saja
export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "admin")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};

app.use(UserRoute);
app.use(MahasiswaRoute);
app.use(AuthRoute);
app.use(KeuanganRoute);
app.use(InformasiRoute);
app.use(KamarRoute);

store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
