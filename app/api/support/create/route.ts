import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export async function POST(req: Request) {

    try {

        const body = await req.json();


        const {
            userId,
            subject,
            message
        } = body;



        if (!userId || !subject || !message) {

            return NextResponse.json(
                {
                    error: "Заполните все поля"
                },
                {
                    status: 400
                }
            );
        }



        const ticket = await prisma.supportTicket.create({

            data: {

                userId: Number(userId),

                subject: subject,

                message: message

            }

        });



        return NextResponse.json(ticket);


    } catch (error) {


        console.error(error);


        return NextResponse.json(

            {
                error: "Ошибка создания обращения"
            },

            {
                status: 500
            }

        );

    }

}