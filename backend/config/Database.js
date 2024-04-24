import { Sequelize } from "sequelize";

const db = new Sequelize("db_asramasulteng", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
