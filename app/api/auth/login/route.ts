import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();



export async function POST(req:Request){


    try{


        const body = await req.json();



        const {
            nickname,
            password,
            server
        } = body;




        if(!nickname || !password){


            return NextResponse.json(

                {
                    error:"Заполните никнейм и пароль"
                },

                {
                    status:400
                }

            );


        }




        const exists = await prisma.user.findUnique({

            where:{

                nickname:nickname

            }

        });




        if(exists){


            return NextResponse.json(

                {
                    error:"Такой пользователь уже существует"
                },

                {
                    status:400
                }

            );


        }





        const hash = await bcrypt.hash(

            password,

            10

        );





        const user = await prisma.user.create({

            data:{


                nickname:nickname,

                password:hash,

                server:server || "",

                role:"USER",

                avatar:""

            }

        });






        return NextResponse.json({


            success:true,


            user:{


                id:user.id,

                nickname:user.nickname,

                server:user.server,

                role:user.role,

                avatar:user.avatar


            }


        });




    }

    catch(error:any){


        console.error(

            "REGISTER ERROR:",

            error

        );



        return NextResponse.json(

            {
                error:error.message ||
                "Ошибка регистрации"
            },

            {
                status:500
            }

        );


    }


}