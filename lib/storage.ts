    import {
  S3Client,
  PutObjectCommand
} from "@aws-sdk/client-s3";


const s3 = new S3Client({

  region: "eu-central-003",

  endpoint: process.env.B2_ENDPOINT,

  credentials: {

    accessKeyId:
      process.env.B2_KEY_ID!,

    secretAccessKey:
      process.env.B2_APPLICATION_KEY!

  }

});


export async function uploadFile(
  file: Buffer,
  filename: string,
  type: string
){

  const command = new PutObjectCommand({

    Bucket:
      process.env.B2_BUCKET_NAME,

    Key:
      filename,

    Body:
      file,

    ContentType:
      type

  });


  await s3.send(command);


  return `${process.env.B2_ENDPOINT}/${process.env.B2_BUCKET_NAME}/${filename}`;

}