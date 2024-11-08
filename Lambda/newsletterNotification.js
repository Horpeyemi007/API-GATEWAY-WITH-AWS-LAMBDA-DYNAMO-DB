import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const client = new SNSClient({});
const TOPIC_ARN = process.env.topicARN;
let email;
let newsLetter;


let response = {
  statusCode: 200,
  body: "",
};

export const handler = async (event) => {
  const eventRecord = event['Records'];
  if(eventRecord){
    eventRecord.forEach(element => {
      const newImage = element['dynamodb']['NewImage'];
      if(newImage){
        email = newImage['Email']['S'];
        newsLetter = newImage['NewsLetterType']['S'];
      };
    });
  }
  if(email && newsLetter){
    const input = {
      TopicArn: TOPIC_ARN,
      Message: `THE NEWSLETTER "${newsLetter}" HAS BEEN SUBSCRIBED TO BY "${email}"`,
      Subject: "NEW SUBSCRIBER ALERT",
      MessageStructure: "raw"
    };
    const command = new PublishCommand(input);
    try {
      const data = await client.send(command);
      console.log(data)
      response.body = "NEW NEWSLETTER SUBSCRIBER DETAILS HAVE BEEN SUCCESSFULLY SENT TO THE PROVIDED EMAIL";
      return response;
    } catch (error) {
      console.log("ERROR SENDING EMAIL NOTIFICATION ABOUT NEW SUBSCRIBER");
      console.log(JSON.stringify(error));
      response.body = "ERROR SENDING NEW SUBSCRIBER DETAILS TO THE PROVIDED EMAIL";
      response.statusCode = 400;
      return response;
    }
  }

  response.body = "AN INTERNAL SERVER ERROR HAS OCCURED!!!";
  response.statusCode = 500;
  return response;
};
