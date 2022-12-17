const logger = require("../utils/logger").child({path: 'utils/dynamoDBHelper'})

var AWS = require("aws-sdk");

// Set the AWS Region. 
AWS.config.update({ region: process.env.AWS_REGION });

var ddb = new AWS.DynamoDB.DocumentClient();
// { apiVersion: "2012-08-10" }
const params = {
  // Specify which items in the results are returned.
  TableName: "discord-servers",
};

function getServerSheetMap(){
    logger.info("Getting server metadata from DynamoDB")
    ddb.scan(params, function (err, data) {
          if (err) {
            console.log("Error", err);
          } else {
            console.log("Success", data);
            serverSheetMap = _convertDataToMap(data)
            return serverSheetMap
            // data.Items.forEach(function (element, index, array) {
            //   console.log(
            //       "printing",
            //       element.Title.S + " (" + element.Subtitle.S + ")"
            //   );
            // });
          }
    });
}

function _convertDataToMap(data){
  data = data.Items
  let map = {}
  data.forEach(item => map[item.serverID] = item.googleSpreadsheetId)
  logger.debug(map)
  return map
}

module.exports = { getServerSheetMap }
