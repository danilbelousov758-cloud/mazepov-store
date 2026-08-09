import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { mkdir, writeFile } from "fs/promises";
import path from "path";


const prisma = new PrismaClient();



export async function POST(req: Request) {

    try {


        const formData = await req.formData();



        const title = formData.get("title") as string;

        const category = formData.get("category") as string;

        const txdPath = formData.get("txdPath") as string;

        const dffPath = formData.get("dffPath") as string;



        const image = formData.get("image") as File | null;

        const txd = formData.get("txd") as File | null;

        const dff = formData.get("dff") as File | null;



        if (
            !title ||
            !category ||
            !image ||
            !txd ||
            !dff
        ) {

            return NextResponse.json(
                {
                    error: "Заполните все обязательные поля"
                },
                {
                    status: 400
                }
            );

        }




        const uploadFolder = path.join(
            process.cwd(),
            "public/uploads/mods"
        );



        await mkdir(
            uploadFolder,
            {
                recursive: true
            }
        );






        async function saveFile(file: File) {


            const bytes =
                await file.arrayBuffer();


            const buffer =
                Buffer.from(bytes);



            const filename =
                `${Date.now()}-${file.name}`;



            const filepath =
                path.join(
                    uploadFolder,
                    filename
                );



            await writeFile(
                filepath,
                buffer
            );



            return `/uploads/mods/${filename}`;

        }






        const imageUrl =
            await saveFile(image);



        const txdUrl =
            await saveFile(txd);



        const dffUrl =
            await saveFile(dff);









        const mod =
            await prisma.mod.create({

                data: {

                    title,

                    category,

                    image: imageUrl,

                    txd: txdUrl,

                    dff: dffUrl,

                    txdPath: txdPath || "",

                    dffPath: dffPath || "",

                }

            });








        return NextResponse.json(
            {
                success: true,
                mod
            }
        );



    }
    catch(error) {


        console.error(
            "CREATE MOD ERROR:",
            error
        );



        return NextResponse.json(
            {
                error: "Ошибка создания мода"
            },
            {
                status:500
            }
        );


    }


}