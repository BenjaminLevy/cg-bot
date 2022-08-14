const { SecretsManagerClient, GetSecretValueCommand} = require("../aws-sdk/client-secrets-manager")
const {Buffer} = require("node:buffer")

// process.env.AWS_REGION must be set in command line when starting the application.
const secretsClient = new SecretsManagerClient({ region: process.env.AWS_REGION });

// Set the parameters
const params = {
  SecretId: "arn:aws:secretsmanager:us-east-1:962596043005:secret:test-jd4iwd", //e.g. arn:aws:secretsmanager:REGION:XXXXXXXXXXXX:secret:mysecret-XXXXXX
};

const run = async () => {
  let data;
  try {
    data = await secretsClient.send(new GetSecretValueCommand(params));
    console.log("data", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("err", err);
  }
  let secret;
  if ("SecretString" in data) {
    secret = data.SecretString;
  } else {
    console.log("else:", data);

    // Create a buffer
    const buff = new Buffer.from(data.SecretBinary, "base64");
    secret = buff.toString("ascii");
  }
  console.log(secret);
};
run();

module.exports = {run, params}