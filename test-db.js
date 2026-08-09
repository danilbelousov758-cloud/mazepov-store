const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
.then(() => {
  console.log("DATABASE CONNECTED");
  return client.end();
})
.catch(err => {
  console.log("ERROR:");
  console.log(err);
});