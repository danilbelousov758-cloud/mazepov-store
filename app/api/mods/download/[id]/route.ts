import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import JSZip from "jszip";
import {
    S3Client,
    GetObjectCommand
} from "@aws-sdk/client-s3";

const prisma = new PrismaClient();



const s3 = new S3Client({

    region: process.env.S3_REGION,

    endpoint: process.env.S3_ENDPOINT,

    credentials: {

        accessKeyId:
        process.env.S3_ACCESS_KEY!,

        secretAccessKey:
        process.env.S3_SECRET_KEY!

    }

});





async function streamToBuffer(
    stream:any
){

    const chunks:any[] = [];


    for await(
        const chunk of stream
    ){

        chunks.push(chunk);

    }


    return Buffer.concat(chunks);

}








export async function GET(

    req:Request,

    context:{
        params:Promise<{
            id:string
        }>
    }

){

    try{


        const {
            id
        } = await context.params;





        const mod =
        await prisma.mod.findUnique({

            where:{
                id:Number(id)
            }

        });





        if(!mod){

            return NextResponse.json(

                {
                    error:"Мод не найден"
                },

                {
                    status:404
                }

            );

        }








        const zip =
        new JSZip();





        let filesCount = 0;







        if(mod.dff){


            try{


                const command =
                new GetObjectCommand({

                    Bucket:
                    process.env.S3_BUCKET,


                    Key:
                    mod.dff

                });




                const response =
                await s3.send(command);




                if(response.Body){


                    const buffer =
                    await streamToBuffer(
                        response.Body
                    );



                    zip.file(

                        `${mod.title}.dff`,

                        buffer

                    );



                    filesCount++;


                }



            }

            catch(error){


                console.log(
                    "DFF ERROR",
                    error
                );


            }



        }









        if(mod.txd){


            try{


                const command =
                new GetObjectCommand({

                    Bucket:
                    process.env.S3_BUCKET,


                    Key:
                    mod.txd

                });





                const response =
                await s3.send(command);




                if(response.Body){


                    const buffer =
                    await streamToBuffer(
                        response.Body
                    );



                    zip.file(

                        `${mod.title}.txd`,

                        buffer

                    );



                    filesCount++;


                }



            }

            catch(error){


                console.log(
                    "TXD ERROR",
                    error
                );


            }


        }










        if(filesCount===0){


            return NextResponse.json(

                {

                    error:
                    "Файлы не найдены в S3",

                    dff:
                    mod.dff,

                    txd:
                    mod.txd

                },

                {

                    status:400

                }

            );


        }









        const archive =
await zip.generateAsync({

    type:"arraybuffer",

    compression:"DEFLATE",

    compressionOptions:{

        level:9

    }

});







        return new NextResponse(

            archive,

            {

                headers:{


                    "Content-Type":

                    "application/zip",



                    "Content-Disposition":

                    `attachment; filename="${encodeURIComponent(mod.title)}.zip"`


                }

            }

        );






    }

    catch(error:any){


        console.error(
            "DOWNLOAD ERROR:",
            error
        );



        return NextResponse.json(

            {

                error:
                error.message ||
                "Ошибка скачивания"

            },

            {

                status:500

            }

        );


    }


}