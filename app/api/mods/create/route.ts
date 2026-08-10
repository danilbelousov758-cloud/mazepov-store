import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();




export async function POST(
    req: Request
) {


    try {


        const body = await req.json();



        const {
            title,
            category,
            image,
            txd,
            dff
        } = body;





        if(
            !title ||
            !category ||
            !image
        ) {


            return NextResponse.json(

                {
                    error:
                    "Заполните название, категорию и изображение"
                },

                {
                    status:400
                }

            );


        }







        console.log(
            "CREATE MOD:",
            title
        );







        const mod = await prisma.mod.create({

            data:{


                title,


                category,



                image,



                txd:
                txd || "",



                dff:
                dff || "",



                txdPath:
                txd || "",



                dffPath:
                dff || ""



            }

        });








        return NextResponse.json({

            success:true,

            mod

        });





    }

    catch(error:any){



        console.error(

            "CREATE MOD ERROR:",

            error

        );





        return NextResponse.json(

            {

                error:

                error.message ||

                "Ошибка создания мода"

            },

            {

                status:500

            }

        );


    }


}