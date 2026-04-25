# INFRASTRUCTURE

## AWS CDK deployment (S3 / optional CloudFront)

Infrastructure is defined in `lib/frontend-hosting-stack.ts` and wired in `bin/cdk.ts`.
Toggle `ENABLE_CLOUDFRONT` in the stack file: `false` publishes the Vite build to a **public S3 static website**; `true` adds **CloudFront** and cache invalidation on deploy.

### Prerequisites

1. [Node.js](https://nodejs.org/) and npm (project dependencies installed with `npm install`).
2. [AWS CLI v2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) on your `PATH`.
3. AWS credentials for an IAM user with permission to create the stack (S3, CloudFormation, IAM roles used by CDK assets, etc.).

Configure the default profile and region (used by CDK unless you override `AWS_PROFILE` / `AWS_REGION`):

```bash
aws configure
```

Check identity:

```bash
aws sts get-caller-identity
```

### One-time: bootstrap CDK in this account and region

Required before the first `deploy` in an environment (creates CDK bootstrap resources, including the SSM parameter CDK expects):

```bash
npm run infra:bootstrap
```

Run this once per **AWS account + region** you deploy into.

### Infrastructure scripts

| Script                    | What it does                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `npm run cdk -- <args>`   | Runs the CDK CLI (e.g. `npm run cdk -- diff`).                                                          |
| `npm run infra:bootstrap` | `cdk bootstrap` — prepare the account/region for CDK.                                                   |
| `npm run infra:synth`     | Builds the app (`dist/`) then `cdk synth` — validates the CloudFormation template without deploying.    |
| `npm run infra:deploy`    | Builds the app then `cdk deploy --require-approval never` — deploys the stack and uploads the frontend. |
| `npm run infra:destroy`   | `cdk destroy --force` — deletes the stack and managed resources (use with care).                        |

Typical flow:

```bash
npm install
npm run infra:bootstrap
npm run infra:deploy
```

After a successful deploy, CDK prints **Outputs** from the stack, for example `BucketName` and `S3WebsiteUrl` (S3-only mode) or `CloudFrontUrl` when `ENABLE_CLOUDFRONT` is `true`. Open that URL in a browser to verify the site.

To tear everything down:

```bash
npm run infra:destroy
```
