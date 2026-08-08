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









    const passwordMatch = await bcrypt.compare(


      password,


      user.password


    );










    if(!passwordMatch){


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
          error:"Выбран неверный сервер"
        },

        {
          status:400
        }

      );


    }









    const response = NextResponse.json(


      {


        message:"Вход выполнен",


        user:{


          id:user.id,


          nickname:user.nickname,


          server:user.server,


          role:user.role


        }


      }


    );








    response.cookies.set(


      "userId",


      String(user.id),


      {


        httpOnly:true,


        secure:false,


        sameSite:"lax",


        maxAge:60 * 60 * 24 * 7


      }


    );









    return response;







  } catch(error) {



    console.log(error);




    return NextResponse.json(

      {

        error:"Ошибка сервера"

      },


      {

        status:500

      }

    );


  }


}