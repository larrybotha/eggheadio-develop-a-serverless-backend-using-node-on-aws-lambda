# Eggheadio - Develop a Serverless Backend using Node.js on AWS Lambda

Notes and annotations for https://egghead.io/courses/develop-a-serverless-backend-using-node-js-on-aws-lambda

## Create a User and setup the AWS CLI to interact with AWS

1. Create an IAM user with programmatic access, and AdministratorAccess policy
   (for ease of testing / evaluation - not recommended for production)
2. Install `awscli`: `$ brew install awscli`
3. Store the user's key on your system by:
    1. Running `$ aws configure`
    2. Entering Access Key ID for new user
    3. Entering Secret access key for new user
    4. Used defaults for remaining options

## Setup the Serverless Framework

1. Install `serverless` framework: `$ npm i -g serverless`
2. `sls` is an alias for the `serverless` command
3. `$ sls` will show all commands available through the serverless framework
4. You can use `sls create -h` to see how to bootstrap projects

## Deploy a Node.js function to AWS Lambda using the Serverless Framework

1. create `serverless.yml`
2. add `service` property with name of your application
3. add `provider` block with name of provider and runtime for your service
4. add `functions` block to define your functions
5. in `functions` block add a name for a function, and in that block add a
   `handler` property with `handler.[my-export-name]` for the function that
   Lambda will execture for that function block
6. create a js file with a named export of the same name as the handler defined
   in the above step.
7. lambdas take 3 parameters

    1. event - request data
    2. context - aws-specific data
    3. callback - a function that should be invoked with either an error
       response for the first argument, or a success response for the second
       argument
8. deploy the service using `sls deploy`
9. test the service works by running `sls invoke --function [functionName]`
10. `console.log` statements can be evaluated by running the `invoke` command
    with the `--log` flag:

    ```bash
    $ sls invoke --function myFunc --log
    ```
11. one can view past logs for a function, too:

    ```bash
    $ sls logs --function myFunc
    ```
12. instead of calling the callback in the function, we can instead return a
    promise
13. to redeploy a change to a specific function faster, run:

    ```bash
    $ sls deploy --function myFunc
    ```
14. with Node 8 we can leverage `async / await`, so we can define a function as
    `async` instead of explicitly returning a promise

## Attach a HTTP endpoint to an AWS Lambda function using the Serverless Framework

1. we can configure HTTP endpoints for lambdas by defining an HTTP path and method in
   `serverless.yml` on the `events` property.
2. to create a `GET` request at the path `/` we can do the following:

    ```yaml
    functions:
      myFunction:
        handler: [file-name].[function-name]
        events:
          - http
            path: /
            method: GET
    ```
3. lambdas can only be invoked by an AWS SDK
4. AWS's API Gateway is such an SDK, and the serverless framework configures one
   under the hood
5. when using events for lambdas, responses must be structured with a
   `statusCode` and `body`
6. one has to rerun deployment when `serverless.yml` is updated so that the
   stack is updated accordingly, and because we've added an http event, the API
   Gateway service needs to be configured
7. once the deployment succeeds, we will receive an endpoint where a request can
   be made using curl etc.

## Deploy a DynamoDB table to AWS using the Serverless Framework

To store data, we need a database

1. to add resources to your application, such as DynamoDB, add a `resources` block in the root `Serverless.yml`
2. nest a `Resources` block inside that block. Cloud formation also supports
   keywords in addition to `Resources`, so the nesting is required
3. the minimum configuration for a table includes:

    1. table name
    2. attributes for primary and secondary instances
    3. key schema with mandatory properties for the primary key of the table
    4. throughput capacity for read and write access
4. run `$ sls deploy` to have the serverless framework configure the application
5. you can see the instance in your AWS console
