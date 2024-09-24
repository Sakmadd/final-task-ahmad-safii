 
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
})

pool.connect((err) => {
  if (err) {
    console.error('Connection error', err.stack)
  } else {
    console.log('Connected to the database')
  }
})


const query = (text, params) => pool.query(text, params)

module.exports = query
