import pg from "pg";

const connectDatabase = () => {
  const pool = new pg.Pool({
    user: "postgres",
    password: "AdminJohn",
    database: "metrohivedb",
    host: "localhost",
  });
  return pool;
};

export { connectDatabase };
