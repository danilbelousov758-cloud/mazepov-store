import { NextResponse } from "next/server";
import { createUploadUrl } from "@/lib/storage";


export async function POST(
    req: Request
) {


    try {


        const body =
            await req.json();



        const {
            filename,
            type
        } = body;



        if(
            !filename ||
            !type
        ){

            return NextResponse.json(
                {
                    error:
                    "Нет данных"
                },
                {
                    status:400
                }
            );

        }




        const key =
            `${Date.now()}-${filename}`;



        const url =
            await createUploadUrl(
                key,
                type
            );



        return NextResponse.json({

            url,

            key

        });



    }
    catch(error){


        console.error(error);



        return NextResponse.json(
            {
                error:
                "Ошибка создания ссылки"
            },
            {
                status:500
            }
        );


    }

}