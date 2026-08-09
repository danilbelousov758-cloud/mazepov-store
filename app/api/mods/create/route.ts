import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


export async function POST(req: Request) {

  try {


    const formData = await req.formData();



    const title = formData.get("title") as string;

    const category = formData.get("category") as string;

    const description = formData.get("description") as string;



    const image = formData.get("image") as File | null;

    const dff = formData.get("dff") as File | null;

    const txd = formData.get("txd") as File | null;



    if(!title || !category){

      return NextResponse.json(
        {
          error:"Заполните обязательные поля"
        },
        {
          status:400
        }
      );

    }



    const modsFolder = path.join(
      process.cwd(),
      "public",
      "mods"
    );



    if(!fs.existsSync(modsFolder)){

      fs.mkdirSync(
        modsFolder,
        {
          recursive:true
        }
      );

    }





    async function saveFile(file:File | null){

      if(!file){

        return null;

      }


      const buffer = Buffer.from(
        await file.arrayBuffer()
      );


      const filename =
        Date.now()
        +
        "-"
        +
        file.name.replace(/\s/g,"_");



      fs.writeFileSync(
        path.join(
          modsFolder,
          filename
        ),
        buffer
      );


      return "/mods/" + filename;

    }





    const imagePath = await saveFile(image);

    const dffPath = await saveFile(dff);

    const txdPath = await saveFile(txd);






    const filePath = path.join(
      process.cwd(),
      "data",
      "mods.json"
    );



    if(!fs.existsSync(
      path.dirname(filePath)
    )){

      fs.mkdirSync(
        path.dirname(filePath),
        {
          recursive:true
        }
      );

    }




    let mods:any[] = [];



    if(fs.existsSync(filePath)){

      mods = JSON.parse(
        fs.readFileSync(
          filePath,
          "utf-8"
        )
      );

    }





    const newMod = {

      id: Date.now(),

      title,

      category,

      description,

      image:imagePath,

      dff:dffPath,

      txd:txdPath,

      createdAt:new Date()

    };





    mods.push(newMod);




    fs.writeFileSync(

      filePath,

      JSON.stringify(
        mods,
        null,
        2
      )

    );






    return NextResponse.json(
      newMod,
      {
        status:200
      }
    );





  } catch(error){


    console.log(error);



    return NextResponse.json(

      {
        error:"Ошибка создания мода"
      },

      {
        status:500
      }

    );


  }

}