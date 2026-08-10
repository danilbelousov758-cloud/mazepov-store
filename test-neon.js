const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function test(){

  try{

    await client.connect();

    const result = await client.query(
      "SELECT NOW();"
    );

    console.log("УСПЕХ:", result.rows);

  }
  catch(error){

    console.error("ОШИБКА:", error.message);

  }
  finally{

    await client.end();

  }

}

test();