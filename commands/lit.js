module.exports = {
	name: 'cg',
	description: 'Finds literature from keyword and sends as message in channel',

	execute(message, args) {

		const keyword = args[0].toLowerCase()
		const memeChannels = ['memes','off-topic','vent']
		const { GoogleSpreadsheet } = require('../node_modules/google-spreadsheet');

		// spreadsheet key is the long id in the sheets URL
		const doc = new GoogleSpreadsheet('1GstwtiZD1VXkM7VgmK9MnRyVsEjRp35FSXIute3BHeo');

		async function accessSpreadsheet() {
		  await doc.useServiceAccountAuth({
		    client_email: process.env.client_email,
		    private_key: process.env.private_key,
		  });

		  await doc.loadInfo(); // loads document properties and worksheets
		  console.log(doc.title);


		  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
		  const rows = await sheet.getRows();

		  await sheet.loadCells('A1:C65'); // loads a range of cells
		  console.log(sheet.cellStats); // total cells, loaded, how many non-empty
		  console.log(sheet.getCell(1, 0).value);

			if(keyword == "help"){
				let allKeywords = [];
				for(let i = 0; i <= rows.length; i++){
					if(sheet.getCell(i,2).value !== 0){
			    	allKeywords += sheet.getCell(i,0).value + ", ";
					}
				}
				message.channel.send(`Here are all the keywords you can use with !cg: ${allKeywords}`);
			}
			console.log(message.channel.name)
		  for(let i = 0; i <= rows.length; i++){
		    let currentCell = sheet.getCell(i,0)
				let memeCellObject = sheet.getCell(i, 2)
				let memeCellValue = memeCellObject.value
		    if(currentCell.value === keyword){
					console.log(memeCellValue)
					console.log( memeChannels.indexOf(message.channel.name))
					if(memeCellValue === 0 && memeChannels.indexOf(message.channel.name) == -1){return}
					else{message.channel.send(sheet.getCell(i,1).value);}
		    }
		      }
			//TODO add condition for keyword not found

		}

		accessSpreadsheet();
	},
};

