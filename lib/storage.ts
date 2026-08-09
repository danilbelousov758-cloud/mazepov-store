import {
    S3Client,
    PutObjectCommand
} from "@aws-sdk/client-s3";

import {
    getSignedUrl
} from "@aws-sdk/s3-request-presigner";


const s3 = new S3Client({

    region: "eu-central-003",

    endpoint: process.env.B2_ENDPOINT,

    credentials: {

        accessKeyId:
            process.env.B2_KEY_ID as string,

        secretAccessKey:
            process.env.B2_APPLICATION_KEY as string

    }

});



export async function createUploadUrl(
    filename: string,
    contentType: string
) {


    if(
        !process.env.B2_BUCKET_NAME
    ){

        throw new Error(
            "B2_BUCKET_NAME отсутствует"
        );

    }



    const command =
        new PutObjectCommand({

            Bucket:
                process.env.B2_BUCKET_NAME,

            Key:
                filename,

            ContentType:
                contentType

        });



    const url =
        await getSignedUrl(
            s3,
            command,
            {
                expiresIn: 3600
            }
        );



    return url;

}