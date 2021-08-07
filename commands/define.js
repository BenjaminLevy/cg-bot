const { googleSpreadsheetID } = require('../config.json');

module.exports = {
	name: 'define',
	aliases: ['d'],
	description: 'Defines acronyms',

	execute(message, args) {

		const keyword = args[0].toLowerCase()

		const { GoogleSpreadsheet } = require('../node_modules/google-spreadsheet');
		const creds = require('../client_secret.json');

		// spreadsheet key is the long id in the sheets URL
		const doc = new GoogleSpreadsheet(googleSpreadsheetID);

		async function accessSpreadsheet() {
		  await doc.useServiceAccountAuth({
		    client_email: creds.client_email,
		    private_key: creds.private_key,
		  });

		  await doc.loadInfo(); // loads document properties and worksheets


		  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
		  const rows = await sheet.getRows();
		  
		  await sheet.loadCells('A1:F200'); // loads a range of cells
	

		  for(let i = 0; i <= rows.length; i++){
		    let currentCell = sheet.getCell(i,1)
		    if(currentCell.value.toLowerCase().trim() == keyword){
		      message.channel.send(sheet.getCell(i,2).value);
		    }
		      }
				//TODO add condition for keyword not found

		}

		accessSpreadsheet();
	},
};


