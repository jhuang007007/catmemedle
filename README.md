# <ins> [Catmemedle](https://www.catmemedle.org) </ins>

A 'dle' type game where the player guesses what the blurred cat meme is. Players have five guesses before the answer is revealed.

## Hosting

Catmemedle, https://www.catmemedle.org/, is hosted on S3 + AWS Cloudfront guided by [this AWS documentation](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/getting-started-cloudfront-overview.html). Catmemedle uses SSL cerfication from ACM and is currently geographically restricted to certain countries for security purposes.

## Storage

Catmemedle uses a combination of AWS S3 and DynamoDB to store the image data.

## Image Processing

Catmemedle uses an automated serverless approach to blur the images. Method adapted from [this blog post](https://aws.amazon.com/blogs/compute/creating-a-serverless-face-blurring-service-for-photos-in-amazon-s3/) by James Beswick @jbesw:

1. When images uploaded to the S3 source bucket, S3 sends an event notification to an Amazon SQS queue.
2. The Lambda service polls the SQS queue and invokes an AWS Lambda function when messages are available.
3. The Lambda function uses Amazon Rekognition to detect cats via the [DetectLabelsCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/rekognition/command/DetectLabelsCommand/) in the source image. The service returns the coordinates of the cats to the function.
4. After blurring the cats in the source image, the function stores the resulting image in the output S3 bucket.

The Lambda function code was adapted from AWS-SDK V2 to AWS-SDK V3 and the detectFaces function was changed to detect cats instead.

## Frontend Technologies

Catmemdedle is a Vite react template using Node.js, React, and MUI.

## Backend Technologies

Catmemedle uses a combination of AWS Lambda and API Gateway to fetch data from the S3 buckets and DynamoDB table.  
