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
            !filename
        ){

            return NextResponse.json(
                {
                    error:
                    "Нет имени файла"
                },
                {
                    status:400
                }
            );

        }



        const url =
            await createUploadUrl(
                filename,
                type ||
                "application/octet-stream"
            );



        return NextResponse.json({

            success:true,

            url,

            key:filename

        });



    }
    catch(error){


        console.error(
            "UPLOAD URL ERROR:",
            error
        );



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