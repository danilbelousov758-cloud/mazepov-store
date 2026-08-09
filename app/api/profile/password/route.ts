import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";


export async function POST(request:Request){

try{


const {
id,
oldPassword,
newPassword
}=await request.json();



const user = await prisma.user.findUnique({

where:{
id:Number(id)
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



const check = await bcrypt.compare(
oldPassword,
user.password
);



if(!check){

return NextResponse.json(
{
error:"Старый пароль неверный"
},
{
status:400
}
);

}




const hash = await bcrypt.hash(
newPassword,
10
);



await prisma.user.update({

where:{
id:user.id
},

data:{
password:hash
}

});




return NextResponse.json({

success:true

});



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