import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";


const prisma = new PrismaClient();




export async function POST(

    req: Request

){


    try{


        const formData = await req.formData();




        const title = String(

            formData.get("title") || ""

        );



        const category = String(

            formData.get("category") || ""

        );



        const image = formData.get("image") as File | null;



        const dff = formData.get("dff") as File | null;



        const txd = formData.get("txd") as File | null;







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









        const modsDir = path.join(

            process.cwd(),

            "public",

            "mods"

        );



        const imageDir = path.join(

            modsDir,

            "images"

        );



        const dffDir = path.join(

            modsDir,

            "dff"

        );



        const txdDir = path.join(

            modsDir,

            "txd"

        );







        await fs.mkdir(

            imageDir,

            {

                recursive:true

            }

        );



        await fs.mkdir(

            dffDir,

            {

                recursive:true

            }

        );



        await fs.mkdir(

            txdDir,

            {

                recursive:true

            }

        );









        const fileName =

        Date.now()

        +

        "-"

        +

        title.replace(

            /[^a-zA-Z0-9а-яА-Я]/g,

            "_"

        );









        // =====================
        // IMAGE
        // =====================



        const imageName =

        fileName +

        path.extname(

            image.name

        );




        await fs.writeFile(

            path.join(

                imageDir,

                imageName

            ),

            Buffer.from(

                await image.arrayBuffer()

            )

        );





        const imageUrl =

        `/mods/images/${imageName}`;









        // =====================
        // DFF
        // =====================


        let dffUrl = "";




        if(dff){


            const dffName =

            fileName +

            ".dff";




            await fs.writeFile(

                path.join(

                    dffDir,

                    dffName

                ),

                Buffer.from(

                    await dff.arrayBuffer()

                )

            );





            dffUrl =

            `/mods/dff/${dffName}`;


        }









        // =====================
        // TXD
        // =====================


        let txdUrl = "";




        if(txd){


            const txdName =

            fileName +

            ".txd";




            await fs.writeFile(

                path.join(

                    txdDir,

                    txdName

                ),

                Buffer.from(

                    await txd.arrayBuffer()

                )

            );





            txdUrl =

            `/mods/txd/${txdName}`;


        }









        const mod = await prisma.mod.create({

            data:{


                title:title,


                category:category,


                image:imageUrl,


                dff:dffUrl,


                txd:txdUrl,


                dffPath:dffUrl,


                txdPath:txdUrl,


                views:0


            }

        });









        return NextResponse.json(

            {

                success:true,

                mod

            }

        );







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