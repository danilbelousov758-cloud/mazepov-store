import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/storage";


export async function POST(
    req:Request
){

    try{


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




        console.log(
            "TIMEWEB UPLOAD:",
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
        file.type,


        ACL:
        "public-read"

    })

);





        return NextResponse.json({

            success:true,

            key

        });



    }
    catch(error){


        console.error(
            "TIMEWEB UPLOAD ERROR:",
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