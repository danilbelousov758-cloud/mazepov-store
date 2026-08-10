import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import JSZip from "jszip";
import fs from "fs/promises";
import path from "path";


const prisma = new PrismaClient();



export async function GET(

    req: Request,

    context: {

        params: Promise<{

            id:string;

        }>

    }

) {


    try {


        const { id } = await context.params;



        const mod = await prisma.mod.findUnique({

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





        const zip = new JSZip();




        const publicDir = path.join(

            process.cwd(),

            "public"

        );



        let filesCount = 0;








        // =====================
        // DFF
        // =====================


        if(mod.dff){


            const dffFilePath = path.join(

                publicDir,

                mod.dff.replace(

                    /^\//,

                    ""

                )

            );



            try{


                const dffFile = await fs.readFile(

                    dffFilePath

                );



                zip.file(

                    `${mod.title}.dff`,

                    dffFile

                );



                filesCount++;


            }

            catch(error){


                console.log(

                    "DFF не найден:",

                    dffFilePath

                );


            }


        }









        // =====================
        // TXD
        // =====================


        if(mod.txd){


            const txdFilePath = path.join(

                publicDir,

                mod.txd.replace(

                    /^\//,

                    ""

                )

            );



            try{


                const txdFile = await fs.readFile(

                    txdFilePath

                );



                zip.file(

                    `${mod.title}.txd`,

                    txdFile

                );



                filesCount++;


            }

            catch(error){


                console.log(

                    "TXD не найден:",

                    txdFilePath

                );


            }


        }









        if(filesCount === 0){


            return NextResponse.json(

                {

                    error:

                    "У мода нет файлов DFF/TXD",


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









        const archive = await zip.generateAsync({

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

                "Ошибка архива"

            },

            {

                status:500

            }

        );


    }


}