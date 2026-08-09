import {
    S3Client
} from "@aws-sdk/client-s3";


if(!process.env.B2_KEY_ID){
    throw new Error("B2_KEY_ID отсутствует");
}


if(!process.env.B2_APPLICATION_KEY){
    throw new Error("B2_APPLICATION_KEY отсутствует");
}


if(!process.env.B2_BUCKET_NAME){
    throw new Error("B2_BUCKET_NAME отсутствует");
}


if(!process.env.B2_ENDPOINT){
    throw new Error("B2_ENDPOINT отсутствует");
}



console.log("B2 CHECK:");

console.log(
    "KEY:",
    process.env.B2_KEY_ID
);

console.log(
    "BUCKET:",
    process.env.B2_BUCKET_NAME
);

console.log(
    "ENDPOINT:",
    process.env.B2_ENDPOINT
);



export const s3 =
new S3Client({

    region: "eu-central-003",

    endpoint:
        process.env.B2_ENDPOINT,


    forcePathStyle:true,


    credentials:{

        accessKeyId:
            process.env.B2_KEY_ID,


        secretAccessKey:
            process.env.B2_APPLICATION_KEY

    }

});