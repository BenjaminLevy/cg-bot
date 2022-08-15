var AWS = require('aws-sdk'),
    secretName = "test",
    secret,
    decodedBinarySecret;

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    region: process.env.AWS_REGION
});

console.log("hi there");
// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.

client.getSecretValue({SecretId: secretName}, function(err, data) {
    if (err) {
        if (err.code === 'DecryptionFailureException')
            // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InternalServiceErrorException')
            // An error occurred on the server side.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidParameterException')
            // You provided an invalid value for a parameter.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidRequestException')
            // You provided a parameter value that is not valid for the current state of the resource.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'ResourceNotFoundException')
            // We can't find the resource that you asked for.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
    }
    else {
        // Decrypts secret using the associated KMS CMK.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        if ('SecretString' in data) {
            secret = data.SecretString;
            console.log(JSON.parse(secret));
            console.log("string")
        } else {
            let buff = new Buffer(data.SecretBinary, 'base64');
            decodedBinarySecret = buff.toString('ascii');
            console.log(decodedBinarySecret);
        }
    }
    
    // Your code goes here. 
});

// const SDK = require("aws-sdk").SecretsManager
// const Buffer  = require("node:buffer")

// console.log(SDK)
// // process.env.AWS_REGION must be set in command line when starting the application.
// // const secretsClient = new SecretsManagerClient({ region: process.env.AWS_REGION });

// // Set the parameters
// const params = {
//   SecretId: "arn:aws:secretsmanager:us-east-1:962596043005:secret:test-jd4iwd", //e.g. arn:aws:secretsmanager:REGION:XXXXXXXXXXXX:secret:mysecret-XXXXXX
// };

// const run = async () => {
//   let data;
//   try {
//     data = await secretsClient.send(new GetSecretValueCommand(params));
//     console.log("data", data);
//     return data; // For unit tests.
//   } catch (err) {
//     console.log("err", err);
//   }
//   let secret;
//   if ("SecretString" in data) {
//     secret = data.SecretString;
//   } else {
//     console.log("else:", data);

//     // Create a buffer
//     const buff = new Buffer.from(data.SecretBinary, "base64");
//     secret = buff.toString("ascii");
//   }
//   console.log(secret);
// };
// run();

// module.exports = {run, params}