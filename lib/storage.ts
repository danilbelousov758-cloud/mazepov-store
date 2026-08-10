import {
    S3Client
} from "@aws-sdk/client-s3";


console.log("TIMEWEB STORAGE:");

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



export const s3 =
new S3Client({

    endpoint:
        "https://s3.twcstorage.ru",


    region:
        "ru-1",


    forcePathStyle:
        true,


    credentials: {

        accessKeyId:
            process.env.S3_ACCESS_KEY!,


        secretAccessKey:
            process.env.S3_SECRET_KEY!

    },


    // важно для Timeweb
    tls: true

});