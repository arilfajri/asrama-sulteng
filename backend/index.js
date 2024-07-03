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

// app.use(cookieParser());
//
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    origin: "https://asrama-sulteng.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("public"));
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
