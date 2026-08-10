import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();



export async function GET(){


    try{


        const mods = await prisma.mod.findMany({

            orderBy:{

                createdAt:"desc"

            }

        });



        return NextResponse.json(
            mods
        );



    }
    catch(error){


        console.error(
            "GET MODS ERROR:",
            error
        );


        return NextResponse.json(

            {
                error:
                "Ошибка загрузки модов"
            },

            {
                status:500
            }

        );


    }



}