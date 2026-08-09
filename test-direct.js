require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DIRECT_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
.then(() => {
  console.log("DIRECT CONNECTED");
  return client.end();
})
.catch(err => {
  console.log("ERROR:");
  console.log(err);
});