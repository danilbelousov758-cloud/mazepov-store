import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req: Request){

try{

const {nickname}=await req.json();


if(!nickname){

return NextResponse.json(
{
error:"Нет пользователя"
},
{
status:400
}
);

}


const user = await prisma.user.findUnique({

where:{
nickname
},

select:{
id:true,
nickname:true,
role:true,
server:true,
avatar:true,
createdAt:true
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



return NextResponse.json(user);



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