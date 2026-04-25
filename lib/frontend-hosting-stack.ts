import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";

const ENABLE_CLOUDFRONT = false;

export class FrontendHostingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    if (ENABLE_CLOUDFRONT) {
      const siteBucket = new s3.Bucket(this, "SiteBucket", {
        bucketName: `nodejs-aws-shop-react-new-one-bucket-${cdk.Aws.ACCOUNT_ID}`,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        enforceSSL: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      });

      const distribution = new cloudfront.Distribution(
        this,
        "SiteDistribution",
        {
          defaultRootObject: "index.html",
          defaultBehavior: {
            origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
            viewerProtocolPolicy:
              cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          },
          errorResponses: [
            {
              httpStatus: 403,
              responseHttpStatus: 200,
              responsePagePath: "/index.html",
              ttl: cdk.Duration.seconds(0),
            },
            {
              httpStatus: 404,
              responseHttpStatus: 200,
              responsePagePath: "/index.html",
              ttl: cdk.Duration.seconds(0),
            },
          ],
        },
      );

      new s3deploy.BucketDeployment(this, "DeployFrontendAssets", {
        sources: [s3deploy.Source.asset(path.join(__dirname, "..", "dist"))],
        destinationBucket: siteBucket,
        distribution,
        distributionPaths: ["/*"],
      });

      new cdk.CfnOutput(this, "BucketName", {
        value: siteBucket.bucketName,
      });

      new cdk.CfnOutput(this, "CloudFrontUrl", {
        value: siteBucket.bucketWebsiteUrl,
      });
    } else {
      const siteBucket = new s3.Bucket(this, "SiteBucket", {
        bucketName: `nodejs-aws-shop-react-new-one-bucket-${cdk.Aws.ACCOUNT_ID}`,
        websiteIndexDocument: "index.html",
        websiteErrorDocument: "index.html",
        publicReadAccess: true,
        blockPublicAccess: new s3.BlockPublicAccess({
          blockPublicAcls: true,
          ignorePublicAcls: true,
          blockPublicPolicy: false,
          restrictPublicBuckets: false,
        }),
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      });

      new s3deploy.BucketDeployment(this, "DeployFrontendAssets", {
        sources: [s3deploy.Source.asset(path.join(__dirname, "..", "dist"))],
        destinationBucket: siteBucket,
      });

      new cdk.CfnOutput(this, "BucketName", {
        value: siteBucket.bucketName,
      });

      new cdk.CfnOutput(this, "S3WebsiteUrl", {
        value: siteBucket.bucketWebsiteUrl,
      });
    }
  }
}
