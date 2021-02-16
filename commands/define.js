module.exports = {
	name: 'define',
	description: 'Defines acronyms',

	execute(message, args) {

		const keyword = args[0].toLowerCase()

		const { GoogleSpreadsheet } = require('../node_modules/google-spreadsheet');
		const creds = require('../client_secret.json');

		// spreadsheet key is the long id in the sheets URL
		const doc = new GoogleSpreadsheet('1HilYjsIQIIAWtqxJktlkYn8zP_lwvlzlSkZB-IOkT1w');

		async function accessSpreadsheet() {
		  await doc.useServiceAccountAuth({
		    client_email: creds.client_email,
		    private_key: creds.private_key,
		  });

		  await doc.loadInfo(); // loads document properties and worksheets


		  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
		  const rows = await sheet.getRows();
		  const c6 = sheet.getCellByA1

		  await sheet.loadCells('A1:F56'); // loads a range of cells
		  // console.log(sheet.getCell(1, 0).value);

			// if(keyword == "help"){
			// 	let allKeywords = [];
			// 	for(let i = 0; i <= rows.length; i++){
			//     allKeywords += sheet.getCell(i,0).value + ", ";
			// 	}
			// 	message.channel.send(`Here are all the keywords you can use with !cg: ${allKeywords}`);
			// }

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


// accesssSpreadsheet();
