import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma =
    new PrismaClient();



export async function POST(
    req:Request
){


    try{


        const body =
            await req.json();



        const {

            title,

            category,

            image,

            txd,

            dff,

            txdPath,

            dffPath

        } = body;



        if(
            !title ||
            !category ||
            !image ||
            !txd ||
            !dff
        ){

            return NextResponse.json(
                {
                    error:
                    "Не все данные заполнены"
                },
                {
                    status:400
                }
            );

        }



        const mod =
            await prisma.mod.create({

                data:{


                    title,

                    category,


                    image,

                    txd,

                    dff,


                    txdPath:
                        txdPath || "",


                    dffPath:
                        dffPath || ""


                }

            });



        return NextResponse.json({

            success:true,

            mod

        });



    }
    catch(error){


        console.error(
            error
        );


        return NextResponse.json(
            {
                error:
                "Ошибка создания мода"
            },
            {
                status:500
            }
        );


    }

}