import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const query = async (query: string, data?: any[]): Promise<any> => {
  try {
    const res = await pool.query(query, data);
    return res.rows;
  } catch (err) {
    console.log("error:" + err);
    return null;
  }
};

export default query;
