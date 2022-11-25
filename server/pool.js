import pg from "pg";

const connectDatabase = () => {
  const pool = new pg.Pool({
    user: "postgres",
    password: process.env.dbPassword,
    database: "metrohivedb",
    host: "localhost",
  });
  return pool;
};

export { connectDatabase };
