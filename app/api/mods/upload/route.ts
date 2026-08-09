import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/storage";


export async function POST(req: Request) {

    try {

        const formData =
            await req.formData();


        const file =
            formData.get("file") as File;


        const folder =
            formData.get("folder") as string;



        if(!file){

            return NextResponse.json(
                {
                    error:"Файл отсутствует"
                },
                {
                    status:400
                }
            );

        }



        const buffer =
            Buffer.from(
                await file.arrayBuffer()
            );



        const key =
            `${folder}/${Date.now()}-${file.name}`;



        await s3.send(

            new PutObjectCommand({

                Bucket:
                    process.env.B2_BUCKET_NAME!,


                Key:
                    key,


                Body:
                    buffer,


                ContentType:
                    file.type

            })

        );



        return NextResponse.json({

            success:true,

            key

        });



    }
    catch(error){

        console.error(
            "B2 UPLOAD ERROR:",
            error
        );


        return NextResponse.json(
            {
                error:
                "Ошибка загрузки файла"
            },
            {
                status:500
            }
        );

    }

}