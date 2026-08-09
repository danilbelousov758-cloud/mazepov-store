import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/storage";


export async function POST(req: Request) {


    try {


        const body =
            await req.json();



        const {
            filename,
            type
        } = body;



        if(!filename){

            return NextResponse.json(
                {
                    error:"Имя файла отсутствует"
                },
                {
                    status:400
                }
            );

        }




        if(!process.env.B2_BUCKET_NAME){

            throw new Error(
                "B2_BUCKET_NAME отсутствует"
            );

        }





        const command =
            new PutObjectCommand({

                Bucket:
                    process.env.B2_BUCKET_NAME,


                Key:
                    filename,


                ContentType:
                    type ||
                    "application/octet-stream"

            });






        const url =
            await getSignedUrl(
                s3,
                command,
                {
                    expiresIn:3600
                }
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
                "Ошибка создания ссылки загрузки"
            },
            {
                status:500
            }
        );


    }


}