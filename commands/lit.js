const logger = require("../utils/logger").child({command: 'lit'})

module.exports = {
	name: 'cg',
	description: 'Finds literature from keyword and sends as message in channel',

	execute(message, args) {
		logger.info({
			message: message,
			args: args
		})
	try{	
		const keyword = args[0].toLowerCase()
		const memeChannels = ['memes','off-topic','vent']
		const { GoogleSpreadsheet } = require('../node_modules/google-spreadsheet');

		// spreadsheet key is the long id in the sheets URL
		const doc = new GoogleSpreadsheet('1GstwtiZD1VXkM7VgmK9MnRyVsEjRp35FSXIute3BHeo');

		async function accessSpreadsheet() {
		  await doc.useServiceAccountAuth({
		    client_email: process.env.client_email,
		    private_key: process.env.private_key.replace(/\\n/g, "\n")
		  });

		  await doc.loadInfo(); // loads document properties and worksheets
		  logger.info(`Google Sheets document object title: ${doc.title}`);


		  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
		  const rows = await sheet.getRows();

			// Do not try to access MAX_ROW_NUMBER, only access one less.title than it
			const MAX_ROW_NUMBER = 65
		  await sheet.loadCells(`A1:C${MAX_ROW_NUMBER}`); // loads a range of cells

			if(keyword == "help"){
				let allKeywords = [];
				for(let i = 0; i < MAX_ROW_NUMBER; i++){
					if(sheet.getCell(i,2).value !== 0){
			    	allKeywords += sheet.getCell(i,0).value + ", ";
					}
				}
				message.channel.send(`Here are all the keywords you can use with !cg: ${allKeywords}`);
				return
			}
			logger.debug(message.channel.name)
		  for(let i = 0; i < MAX_ROW_NUMBER; i++){
		    let currentCell = sheet.getCell(i,0)
				let memeCellObject = sheet.getCell(i, 2)
				let memeCellValue = memeCellObject.value
		    if(currentCell.value === keyword){
					logger.debug(memeCellValue)
					logger.debug( memeChannels.indexOf(message.channel.name))
					if(memeCellValue === 0 && memeChannels.indexOf(message.channel.name) == -1){return}
					else{message.channel.send(sheet.getCell(i,1).value);}
		    }
		      }
			//TODO add condition for keyword not found

		}

		accessSpreadsheet();
	} catch (e) {
		logger.error(e)
	}

	},
};

