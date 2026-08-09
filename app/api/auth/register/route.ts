import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";


export async function POST(request: Request) {

  try {


    const body = await request.json();



    const {
      nickname,
      password,
      server
    } = body;



    if (!nickname || !password || !server) {

      return NextResponse.json(
        {
          error: "Заполните все поля"
        },
        {
          status: 400
        }
      );

    }





    const userExists = await prisma.user.findUnique({

      where:{
        nickname
      }

    });





    if(userExists){

      return NextResponse.json(
        {
          error:"Такой никнейм уже существует"
        },
        {
          status:400
        }
      );

    }






    const hashedPassword = await bcrypt.hash(
      password,
      10
    );







    const user = await prisma.user.create({

      data:{

        nickname,

        password:hashedPassword,

        server,

        role:"USER"

      }

    });







    return NextResponse.json(

      {

        message:"Регистрация успешна",

        user:{

          id:user.id,

          nickname:user.nickname,

          server:user.server,

          role:user.role

        }

      },

      {
        status:200
      }

    );





  } catch(error:any) {


    console.error(
      "REGISTER ERROR:",
      error
    );



    return NextResponse.json(

      {

        error:
        error.message ||
        "Ошибка сервера"

      },

      {
        status:500
      }

    );


  }

}