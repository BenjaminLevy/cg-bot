const logger = require('./logger')
var AWS = require('aws-sdk'),
    secret,
    //Not currently in use
    decodedBinarySecret,
    secretName = "development"


// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    region: process.env.AWS_REGION
});

// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.

module.exports = function getAWSSecrets(){    
    return new Promise((resolve, reject) => {      
    client.getSecretValue({SecretId: secretName}, function(err, data) {
    if (err) {
    logger.debug("error in here")
        if (err.code === 'DecryptionFailureException')
            // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            // Deal with the exception here, and/or rethrow at your discretion.
            reject(err);
        else if (err.code === 'InternalServiceErrorException')
            // An error occurred on the server side.
            // Deal with the exception here, and/or rethrow at your discretion.
            reject(err);
        else if (err.code === 'InvalidParameterException')
            // You provided an invalid value for a parameter.
            // Deal with the exception here, and/or rethrow at your discretion.
            reject(err);
        else if (err.code === 'InvalidRequestException')
            // You provided a parameter value that is not valid for the current state of the resource.
            // Deal with the exception here, and/or rethrow at your discretion.
            reject(err);
        else if (err.code !== 'ResourceNotFoundException')
            // We can't find the resource that you asked for.
            // Deal with the exception here, and/or rethrow at your discretion.
            reject(err);
    }
    else {
        // Decrypts secret using the associated KMS key.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        if ('SecretString' in data) {
            secret = data.SecretString;
        } else {
            let buff = new Buffer.from(data.SecretBinary, 'base64');
            decodedBinarySecret = buff.toString('ascii');
        }
    resolve(secret)
    }
});
})
}
