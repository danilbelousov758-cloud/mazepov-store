import {
    S3Client
} from "@aws-sdk/client-s3";



console.log("TIMEWEB STORAGE INIT");


console.log(
    "ENDPOINT:",
    process.env.S3_ENDPOINT
);


console.log(
    "BUCKET:",
    process.env.S3_BUCKET
);


console.log(
    "REGION:",
    process.env.S3_REGION
);




if(
    !process.env.S3_ACCESS_KEY ||
    !process.env.S3_SECRET_KEY
){

    console.error(
        "S3 KEYS NOT FOUND"
    );

}




export const s3 = new S3Client({

    endpoint:
        process.env.S3_ENDPOINT ||
        "https://s3.twcstorage.ru",


    region:
        process.env.S3_REGION ||
        "ru-1",


    forcePathStyle:true,


    credentials:{


        accessKeyId:
            process.env.S3_ACCESS_KEY || "",



        secretAccessKey:
            process.env.S3_SECRET_KEY || ""


    }


});