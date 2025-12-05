import { Pool } from "pg";

// Connection to PG Database
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
    console.log("Connected to the Database");
  })
  .catch((err) => {
    console.log("Database connection error");
    console.log(err);
  });

export default pool;
