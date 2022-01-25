import { Pool } from "pg";

const connectionString = 'postgres://gxiqeggq:nSjCX-pZ6tUIQW3R-CJOE4ak33tsE3uQ@tyke.db.elephantsql.com/gxiqeggq';
const db = new Pool({ connectionString})

export default db;