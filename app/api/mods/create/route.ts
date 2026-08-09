import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";


const prisma = new PrismaClient();



export async function POST(
req: Request
){

try{


const form =
await req.formData();



const title =
form.get("title") as string;



const category =
form.get("category") as string;



const txdPath =
form.get("txdPath") as string;



const dffPath =
form.get("dffPath") as string;



const image =
form.get("image") as File;



const txd =
form.get("txd") as File;



const dff =
form.get("dff") as File;





if(
!title ||
!category ||
!image ||
!txd ||
!dff
){

return NextResponse.json(
{
error:"Не все данные заполнены"
},
{
status:400
}
);

}







const uploadDir =
path.join(
process.cwd(),
"public/uploads/mods"
);



await mkdir(
uploadDir,
{
recursive:true
}
);






async function saveFile(
file:File
){


const bytes =
await file.arrayBuffer();



const buffer =
Buffer.from(bytes);



const filename =
Date.now()+"_"+file.name;



const filepath =
path.join(
uploadDir,
filename
);



await writeFile(
filepath,
buffer
);



return "/uploads/mods/"+filename;


}







const imageUrl =
await saveFile(image);



const txdUrl =
await saveFile(txd);



const dffUrl =
await saveFile(dff);









const mod =
await prisma.mod.create({

data:{


title,


category,


image:imageUrl,


txd:txdUrl,


dff:dffUrl,


txdPath:


txdPath || "",



dffPath:


dffPath || "",


}


});







return NextResponse.json(
{
success:true,
mod
}
);



}
catch(error){


console.error(
"CREATE MOD ERROR:",
error
);



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