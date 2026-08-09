import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req: Request){

try{

const body = await req.json();

const {
title,
category,
description,
image,
dff,
txd,
user
}=body;


if(!user){
return NextResponse.json(
{
error:"Не авторизован"
},
{
status:401
}
);
}



if(
user.role !== "OWNER" &&
user.role !== "ADMIN"
){

return NextResponse.json(
{
error:"Нет доступа"
},
{
status:403
}
);

}



const mod = await prisma.mod.create({

data:{

title,

category,

description,

image,

dff,

txd

}

});



return NextResponse.json(
{
success:true,
mod
},
{
status:201
}
);



}catch(error){

console.error(error);

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