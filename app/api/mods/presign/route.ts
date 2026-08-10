import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const s3 = new S3Client({

    region: process.env.S3_REGION,

    endpoint: process.env.S3_ENDPOINT,

    credentials: {

        accessKeyId: process.env.S3_ACCESS_KEY!,

        secretAccessKey: process.env.S3_SECRET_KEY!

    }

});




export async function POST(
    req: Request
){


    try{


        const body = await req.json();



        const {
            fileName,
            fileType,
            folder
        } = body;



        if(

            !fileName ||

            !fileType

        ){

            return NextResponse.json(

                {
                    error:"Нет данных файла"
                },

                {
                    status:400
                }

            );

        }





        if(

            !process.env.S3_BUCKET ||

            !process.env.S3_ENDPOINT ||

            !process.env.S3_ACCESS_KEY ||

            !process.env.S3_SECRET_KEY

        ){

            console.error(

                "S3 ENV NOT FOUND"

            );


            return NextResponse.json(

                {
                    error:"S3 настройки не найдены"
                },

                {
                    status:500
                }

            );

        }






        const key =

        `${folder || "mods"}/${Date.now()}-${fileName}`;







        const command = new PutObjectCommand({

            Bucket:process.env.S3_BUCKET,

            Key:key,

            ContentType:fileType

        });







        const url = await getSignedUrl(

            s3,

            command,

            {

                expiresIn:3600

            }

        );







const fileUrl =
`${process.env.NEXT_PUBLIC_FILES_URL}/${key}`;


return NextResponse.json({

    url,

    key,

    fileUrl

});



    }

    catch(error){



        console.error(

            "PRESIGN ERROR:",

            error

        );



        return NextResponse.json(

            {
                error:"Ошибка создания ссылки"
            },

            {
                status:500
            }

        );


    }


}