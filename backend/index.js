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
import FileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// Sync database
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
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: process.env.REACT_URL,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Aktifkan parsing urlencoded
app.use(
  FileUpload({
    createParentPath: true,
  })
);

app.use(express.static(path.join(__dirname, "public"))); // Menggunakan path untuk menghindari masalah direktori

// Routes
app.use(UserRoute);
app.use(MahasiswaRoute);
app.use(AuthRoute);
app.use(KeuanganRoute);
app.use(InformasiRoute);
app.use(KamarRoute);

// Sync store
store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server up and running on port ${process.env.APP_PORT}`);
});
