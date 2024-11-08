import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({}); // Defining a new dynamoDB client

// Defining a response object
let response ={
  statusCode: 200,
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*'
  }
};

// Handler execution section...
export const handler = async (event) => {
  const method = event.httpMethod;
  let payload;
  const payloadType = typeof event.body; // Check if the payload is of javascript type "Object" or "String"
  payload = (payloadType === 'object') ? event.body : JSON.parse(event.body); // Handle the payload based on its type.
  
  if(method === 'POST'){
    const TABLE_NAME = "Newsletter-Subscription";
    const params = {
      TableName: TABLE_NAME,
      Item: payload,
      ConditionExpression: "attribute_not_exists(Email)",
    };
    const command = new PutCommand(params);
    try {
      const data = await client.send(command);
      response.body = `The newsletter "${payload.NewsLetterType}" has been successfully subscribed to.`
      
      response.statusCode = 201;
      return response;
    } catch (error) {
      response.statusCode = 400;
      if(error.name === 'ConditionalCheckFailedException'){
        response.body = "The email address is already subscribed to."
        return response;
      }
      console.log(JSON.stringify(error))
      response.body = JSON.stringify(error);
      return response;
    };
   
  };

  response.statusCode = 405;
  response.body = `Unsupported httpMethod method "${event.httpMethod}"`;
  return response;
};
