import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/storage";


export async function POST(
    req: Request
){

    try{


        const formData =
            await req.formData();



        const file =
            formData.get("file") as File;



        const folder =
            String(
                formData.get("folder") || "mods"
            );



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



        const safeName =
            file.name
            .replace(
                /[^a-zA-Z0-9._-]/g,
                "_"
            );



        const key =
            `${folder}/${Date.now()}-${safeName}`;



        console.log(
            "UPLOAD S3:",
            key
        );




        await s3.send(

            new PutObjectCommand({

                Bucket:
                process.env.S3_BUCKET!,


                Key:
                key,


                Body:
                buffer,


                ContentType:
                file.type || "application/octet-stream"


            })

        );





        const url =
        `${process.env.S3_PUBLIC_URL}/${key}`;




        return NextResponse.json({

            success:true,

            key,

            url

        });



    }
    catch(error:any){


        console.error(
            "UPLOAD ERROR:",
            error
        );



        return NextResponse.json(

            {
                error:
                error.message ||
                "Ошибка загрузки"
            },

            {
                status:500
            }

        );


    }


}