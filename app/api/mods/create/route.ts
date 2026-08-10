import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();





async function uploadFile(
    file: File,
    folder: string
) {


    const presignResponse = await fetch(
        `${process.env.NEXT_PUBLIC_URL || ""}/api/mods/presign`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                fileName:file.name,

                fileType:file.type,

                folder

            })
        }
    );





    const presignData =
        await presignResponse.json();





    if(!presignResponse.ok){


        throw new Error(

            presignData.error ||

            "Ошибка получения ссылки"

        );


    }








    const uploadResponse = await fetch(

        presignData.url,

        {

            method:"PUT",

            headers:{

                "Content-Type":file.type

            },

            body:file

        }

    );







    if(!uploadResponse.ok){


        throw new Error(

            "Ошибка загрузки в S3"

        );


    }







    return presignData.key;



}









export async function POST(
    req:Request
){


    try{


        const formData =

        await req.formData();







        const title =

        String(

            formData.get("title") || ""

        );






        const category =

        String(

            formData.get("category") || ""

        );







        const image =

        formData.get("image") as File | null;






        const dff =

        formData.get("dff") as File | null;






        const txd =

        formData.get("txd") as File | null;









        if(

            !title ||

            !category ||

            !image

        ){


            return NextResponse.json(

                {

                    error:
                    "Заполните название, категорию и картинку"

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









        const imageUrl =

        await uploadFile(

            image,

            "images"

        );








        let dffUrl = "";



        if(dff){


            dffUrl =

            await uploadFile(

                dff,

                "dff"

            );


        }









        let txdUrl = "";



        if(txd){


            txdUrl =

            await uploadFile(

                txd,

                "txd"

            );


        }









        const mod =

        await prisma.mod.create({

            data:{


                title,


                category,



                image:imageUrl,



                dff:dffUrl,



                txd:txdUrl,



                dffPath:dffUrl,



                txdPath:txdUrl


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