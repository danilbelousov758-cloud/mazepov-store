import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";


export async function getCurrentUser() {


  const cookieStore = await cookies();


  const userId = cookieStore.get("userId")?.value;



  if(!userId){

    return null;

  }





  const user = await prisma.user.findUnique({

    where:{

      id:Number(userId)

    },

    select:{

      id:true,

      nickname:true,

      server:true,

      role:true

    }

  });




  return user;


}