<!-- <div align="center">
  <img src="https://github.com/Horpeyemi007/API-GATEWAY-WITH-AWS-LAMBDA-DYNAMO-DB/blob/master/img/newsLetterArc.png" alt="Alt text" width="200"/>
</div> -->
<!-- ![Alt text](/img/newsLetterArc.jpg "Optional title") -->

![alt text](https://github.com/Horpeyemi007/API-GATEWAY-WITH-AWS-LAMBDA-DYNAMO-DB/blob/master/img/newsLetterArc.png?raw=true")

<br>

In this repository, the following AWS service are used to implement a solution for a company that needs to receive a notification about the details of the users that subscribe to its newsletter.

### Service Used

- `S3 Bucket`: For hosting static website
- `REST API GATEWAY`: Used for api endpoint to submit user details
- `LAMBDA`: Used to process the data from the api gateway endpoint
- `DYNAMO DB`: Act as a database to store the user details
- `SNS`: Used to publish notification about a new user subscription to the company email

### Steps for implementation of solution

### `Step 1`

The S3 bucket is used to hold the client static website for the newsletter. The user interact with the website through their browser pointing to the S3 endpoint where the files are hosted.

The folder `Web-Static-Files` in this repository contains the static web page.

To host the web page on the AWS S3, a bucket is created and the files are uploaded into it and also the bucket is made public, ACls are enabled for the object and the static website hosting features is enabled.

### `Step 2`

A DynamoDB table is created with a simple primary key with the name `email`. The dynamodb will be used to store the details of the users that want to subscribe to the company newsletter.

The dynamodb stream is also enabled on this table for any new items that is been inserted into the table.

### `Step 3`

A lambda function with a name _`newsletterServerless`_ is created that will perform business logic to get the details of the user that wants to subscribe to the company newsletter. Lambda will get the details through the rest-api that the user submit their request to.

Lambda will then process the user details to be stored into the dynamodb table. The lambda function will also be configured to have the necessary permission to interact with the dynamodb table.

### `Step 4`

A Rest-API endpoint is created having a resource name and configured with a POST httpMethod with CORS and lambda proxy integration enabled. The api will be deployed to a prod stage for a url endpoint to be created.

The url is where the user will send all their request details to subscribe to the company newsletter to. The url will be put on the static website, to receive the user input that was submitted via the form on the website.

The rest-api will also be integrated with the lambda function so that it can always trigger the lambda function whenever their is an incoming request from the user.

### `Step 5`

Another lambda function with the name  _`newsletterNotification`_ is created which will interact with the dynamodb stream whenever their is a new event on the dynamodb table. The dynamodb stream will be configured to triggered this lambda function, as the lambda function will get the information about any new records that is been saved on the dynamodb table.

### `Step 6`

An SNS topic will be created with an email type subscription. This is where the company will receive an email notification about any new user that has shown interest to subscribe to their newsletter.

The lambda function _`newsletterNotification`_ will be configured to send email notification to the company email address whenever their is an event by the dynamoDB stream. The lambda function will get the details of the user through the dynamodb stream event details, extract the name and email address of the new user and process an email notification with the new user details to the company email.
