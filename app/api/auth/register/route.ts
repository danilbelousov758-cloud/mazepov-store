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

      where: {
        nickname: nickname
      }

    });



    if (userExists) {

      return NextResponse.json(
        {
          error: "Такой никнейм уже существует"
        },
        {
          status: 400
        }
      );

    }



    const hashedPassword = await bcrypt.hash(
      password,
      10
    );



    const user = await prisma.user.create({

      data: {

        nickname: nickname,

        password: hashedPassword,

        server: server

      }

    });



    return NextResponse.json({

      message: "Регистрация успешна",

      user: {

        id: user.id,

        nickname: user.nickname,

        server: user.server

      }

    });



  } catch (error) {


    console.log(error);



    return NextResponse.json(

      {
        error: "Ошибка сервера"
      },

      {
        status: 500
      }

    );


  }

}