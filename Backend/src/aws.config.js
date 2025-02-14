import AWS from "aws-sdk"

if (!process.env.ACCESS_KEY_AWS || !process.env.SECRET_KEY_AWS || !process.env.AWS_BUCKET_REGION) {
    throw new Error("AWS credentials are missing. Check your .env file.")
}

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_AWS,
    secretAccessKey: process.env.SECRET_KEY_AWS,
    region: process.env.AWS_BUCKET_REGION,
})

const s3 = new AWS.S3()

const generateSignedUrl = async (parentCategory, gender, image) => {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const objectKey = `data/${parentCategory}/${gender}/${image}`;
    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Expires: 3600,
    };
    try {
      const signedUrl = s3.getSignedUrl("getObject", params);
      return signedUrl;
    } catch (error) {
      throw new ApiError(500, "Error while generating signed url ", error);
    }
};

export {s3, generateSignedUrl} 
 
