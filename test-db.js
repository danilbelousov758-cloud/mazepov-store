const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function test(){

    try{

        const result = await prisma.$queryRaw`
            SELECT NOW();
        `;

        console.log(result);

    }
    catch(e){

        console.log(e);

    }
    finally{

        await prisma.$disconnect();

    }

}

test();