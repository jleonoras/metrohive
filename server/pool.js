import pg from "pg";

const connectDatabase = () => {
  const pool = new pg.Pool({
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: "metrohivedb",
    host: "localhost",
  });
  return pool;
};

export { connectDatabase };
