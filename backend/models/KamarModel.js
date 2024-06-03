import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Mahasiswas from "./MahasiswaModel.js";

const { DataTypes } = Sequelize;

const Kamar = db.define(
  "kamar",
  {
    gambar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nomor_kamar: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    fasilitas: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    mahasiswaId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Jika setiap kamar hanya ditempati oleh satu mahasiswa, ubah menjadi false
    },
  },
  {
    freezeTableName: true,
  }
);

Mahasiswas.hasOne(Kamar, { foreignKey: "mahasiswaId" });
Kamar.belongsTo(Mahasiswas, { foreignKey: "mahasiswaId" }); // Definisikan hubungan foreign key

export default Kamar;
