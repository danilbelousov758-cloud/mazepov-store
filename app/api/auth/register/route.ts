import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nickname, password, server } = body;


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


    const existingUser = await prisma.user.findUnique({
      where: {
        nickname
      }
    });


    if (existingUser) {
      return NextResponse.json(
        {
          error: "Пользователь уже существует"
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
        nickname,
        password: hashedPassword,
        server
      }
    });


    return NextResponse.json(
      {
        message: "Регистрация успешна",
        user: {
          id: user.id,
          nickname: user.nickname,
          server: user.server,
          role: user.role
        }
      },
      {
        status: 201
      }
    );


  } catch (error) {

    console.error("REGISTER ERROR:", error);


    return NextResponse.json(
      {
        error: "Ошибка сервера",
        details: String(error)
      },
      {
        status: 500
      }
    );

  }
}