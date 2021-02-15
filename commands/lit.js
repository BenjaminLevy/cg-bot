module.exports = {
	name: 'cg',
	description: 'Finds literature from keyword and sends as message in channel',

	execute(message, args) {

		const keyword = args[0].toLowerCase()

		const { GoogleSpreadsheet } = require('../node_modules/google-spreadsheet');
		const creds = require('../client_secret.json');

		// spreadsheet key is the long id in the sheets URL
		const doc = new GoogleSpreadsheet('1GstwtiZD1VXkM7VgmK9MnRyVsEjRp35FSXIute3BHeo');

		async function accessSpreadsheet() {
		  await doc.useServiceAccountAuth({
		    client_email: creds.client_email,
		    private_key: creds.private_key,
		  });

		  await doc.loadInfo(); // loads document properties and worksheets
		  console.log(doc.title);


		  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
		  const rows = await sheet.getRows();
		  const c6 = sheet.getCellByA1

		  console.log(sheet.title);
		  console.log(sheet.rowCount);

		  await sheet.loadCells('A1:F31'); // loads a range of cells
		  console.log(sheet.cellStats); // total cells, loaded, how many non-empty
		  const a1 = sheet.getCell(1, 0); // access cells using a zero-based index
		  console.log(sheet.getCell(1, 0).value);
		  for(let i = 0; i <= rows.length; i++){
		    let currentCell = sheet.getCell(i,0)
		    if(currentCell.value == keyword){
		      message.channel.send(sheet.getCell(i,1).value);
		    }
		      }
			//TODO add condition for keyword not found

		}

		accessSpreadsheet();
	},
};


// accesssSpreadsheet();
