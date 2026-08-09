import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";


export async function POST(request: Request){

try{


const body = await request.json();


const {
id,
oldPassword,
newPassword
}=body;



if(!id || !oldPassword || !newPassword){

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






const checkPassword = await bcrypt.compare(

oldPassword,

user.password

);






if(!checkPassword){

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

message:"Пароль изменён"

});



}catch(error){


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