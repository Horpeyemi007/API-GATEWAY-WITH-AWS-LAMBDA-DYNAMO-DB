In this repository, the following AWS service are used to implement a solution for a company that needs to receive a notification about the details of the users that subscribe to their newsletter.

### Service Used

- `S3 Bucket`: For hosting static website
- `REST API GATEWAY`: Used for api endpoint to submit user details
- `LAMBDA`: Used to process the data from the api gateway endpoint
- `DYNAMO DB`: Act as a database to store the user details
- `SNS`: Used to publish notification about a new user subscription to the company email
