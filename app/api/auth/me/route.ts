import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req:Request){

try{


const {id}=await req.json();



const user = await prisma.user.findUnique({

where:{
id:Number(id)
},

select:{
id:true,
nickname:true,
server:true,
role:true
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