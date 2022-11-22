//TODO Remove this file?
import { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
// Set the AWS Region.
const REGION = "REGION";
//Set the Secrets Manager Service Object
const secretsClient = new SecretsManagerClient({ region: REGION });
export { secretsClient };