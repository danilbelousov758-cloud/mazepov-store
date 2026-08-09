import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { uploadFile } from "@/lib/storage";

const prisma = new PrismaClient();


export async function POST(req: Request) {

    try {


        const formData = await req.formData();



        const title =
            formData.get("title") as string;


        const category =
            formData.get("category") as string;


        const txdPath =
            formData.get("txdPath") as string || "";


        const dffPath =
            formData.get("dffPath") as string || "";



        const image =
            formData.get("image") as File | null;


        const txd =
            formData.get("txd") as File | null;


        const dff =
            formData.get("dff") as File | null;



        if(
            !title ||
            !category ||
            !image ||
            !txd ||
            !dff
        ){

            return NextResponse.json(
                {
                    error:
                    "Заполните все обязательные поля"
                },
                {
                    status:400
                }
            );

        }



        async function upload(
            file: File,
            folder: string
        ){


            const buffer =
                Buffer.from(
                    await file.arrayBuffer()
                );



            const filename =
                `${folder}/${Date.now()}-${file.name}`;



            const url =
                await uploadFile(
                    buffer,
                    filename,
                    file.type
                );



            return url;


        }





        const imageUrl =
            await upload(
                image,
                "images"
            );



        const txdUrl =
            await upload(
                txd,
                "txd"
            );



        const dffUrl =
            await upload(
                dff,
                "dff"
            );





        const mod =
            await prisma.mod.create({

                data: {


                    title,


                    category,


                    image:
                        imageUrl,


                    txd:
                        txdUrl,


                    dff:
                        dffUrl,


                    txdPath,


                    dffPath,


                }

            });





        return NextResponse.json(
            {
                success:true,
                mod
            }
        );



    }
    catch(error){


        console.error(
            "CREATE MOD ERROR:",
            error
        );



        return NextResponse.json(
            {
                error:
                "Ошибка создания мода"
            },
            {
                status:500
            }
        );


    }

}