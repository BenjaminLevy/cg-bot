// const { promisify } = require('util');
const logger = require('./utils/logger')
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./client_secret.json');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1kU4AhgzqQWYGxvbK8Fj4wA6eSO_IWcBZJYcTVcEUhEY');

async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  logger.debug(doc.title);


  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  const rows = await sheet.getRows();
  logger.debug(sheet.title);
  logger.debug(sheet.rowCount);

  await sheet.loadCells('A1:F31'); // loads a range of cells
  logger.debug(sheet.cellStats); // total cells, loaded, how many non-empty
  logger.debug(sheet.getCell(1, 0).value);
  for(let i = 0; i < rows.length; i++){
    let currentCell = sheet.getCell(i,0)
    if(currentCell.value == "Ellen"){
      logger.debug(sheet.getCell(i,1).value);
    }
      }

}

accessSpreadsheet();
