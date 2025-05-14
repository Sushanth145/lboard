require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // for self-signed certs or testing
    },
  });

// const createTables = async () => {
//   const client = await pool.connect();

//   try {
//     await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

//     await client.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//         username TEXT NOT NULL,
//         region TEXT
//       );
//     `);

//     await client.query(`
//       CREATE TABLE IF NOT EXISTS scores (
//         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//         user_id UUID REFERENCES users(id),
//         score INT,
//         scope TEXT CHECK (scope IN ('daily', 'weekly', 'monthly', 'all_time')),
//         timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//     `);

//     console.log('✅ Tables created successfully');
//   } catch (err) {
//     console.error('❌ Error creating tables:', err);
//   } finally {
//     client.release();
//     pool.end();
//   }
// };

// createTables();

const insertv = async () => {
    const client = await pool.connect();
    try{
        await client.query(`INSERT INTO users (username, region) VALUES ('sushanth', 'india') RETURNING id;
`)
    }catch(err){
        console.log(err);
    }finally{
        client.release();
        pool.end();
    }
};

insertv();