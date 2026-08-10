import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET() {
    try {

        const tickets = await prisma.supportTicket.findMany({
            include: {
                user: true,
                replies: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });


        return NextResponse.json(tickets);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                error: "Ошибка загрузки обращений"
            },
            {
                status:500
            }
        );

    }
}