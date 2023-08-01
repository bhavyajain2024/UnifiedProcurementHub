import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const connectionString = process.env.DATABASE_URL;

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("CompanyZ");
let db1 = conn.db("CompanyX");
let db2 = conn.db("CompanyY");

export {db, db1, db2};
