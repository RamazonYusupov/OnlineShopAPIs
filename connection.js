import { Pool } from "pg";

//Connection to PG Database
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "1974",
  database: "postgres",
});

pool
  .connect()
  .then(() => {
    console.log("Ma'lumotlar omboriga ulandik");
  })
  .catch((err) => {
    console.log("Ma'lumotlar omboriga ulanishda muammo yuz berdi");
    console.log(err);
  });

export default pool;
