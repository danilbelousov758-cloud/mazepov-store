import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/storage";


export async function GET(){

try{


await s3.send(

new PutObjectCommand({

Bucket:
process.env.S3_BUCKET,


Key:
"test.txt",


Body:
"Timeweb работает"


})

);



return NextResponse.json({

success:true

});


}
catch(error){


console.error(error);


return NextResponse.json({

error:String(error)

},
{
status:500
});

}


}