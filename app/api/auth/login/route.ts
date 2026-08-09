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
          error:"Заполните все поля"
        },
        {
          status:400
        }
      );

    }



    const user = await prisma.user.findUnique({

      where:{
        nickname:nickname
      }

    });



    if(!user){

      return NextResponse.json(
        {
          error:"Пользователь не найден"
        },
        {
          status:404
        }
      );

    }



    const checkPassword = await bcrypt.compare(
      password,
      user.password
    );



    if(!checkPassword){

      return NextResponse.json(
        {
          error:"Неверный пароль"
        },
        {
          status:400
        }
      );

    }



    if(user.server !== server){

      return NextResponse.json(
        {
          error:"Неверный сервер"
        },
        {
          status:400
        }
      );

    }




    return NextResponse.json({

      success:true,

      user:{
        id:user.id,
        nickname:user.nickname,
        server:user.server,
        role:user.role
      }

    });


  } catch(error){

    console.log("LOGIN ERROR:",error);


    return NextResponse.json(

      {
        error:"Сервер авторизации недоступен"
      },

      {
        status:500
      }

    );

  }

}