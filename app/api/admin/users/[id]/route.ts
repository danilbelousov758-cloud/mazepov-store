import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function PATCH(
request:Request,
context:{params:Promise<{id:string}>}
){

try{


const {id}=await context.params;


const body=await request.json();



const {
field,
value,
adminRole
}=body;




if(adminRole !== "OWNER"){

return NextResponse.json(
{
error:"Нет прав"
},
{
status:403
}
);

}




if(
field !== "nickname" &&
field !== "server" &&
field !== "role"
){

return NextResponse.json(
{
error:"Поле запрещено"
},
{
status:400
}
);

}





const user = await prisma.user.update({

where:{
id:Number(id)
},

data:{

[field]:value

}

});





return NextResponse.json(user);



}catch(error:any){


console.log(error);


return NextResponse.json(
{
error:error.message
},
{
status:500
}
);


}


}