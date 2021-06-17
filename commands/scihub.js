
module.exports = {
		name: 'scihub',
		aliases: ['s'],
	description: 'takes pubmed link and returns scihub link',
	args: true,
	execute(message, args) {
		const Discord = require('discord.js');
		var HTMLParser = require('node-html-parser')
		// import { parse } from 'node-html-parser';
		const fetch = require("../node_modules/node-fetch");
		// const urlPubmed = new URL(args[0]);
		// let inputID = urlPubmed.pathname.slice(1, -1)

		const inputID = args[0]

	  const url = args[0]
		let scihubUrl = ""
		let doi = ""
		let abstract = ""

		fetch(url)
      .then(res => res.text()) // parse response as JSON
      .then(html => {
				const root = HTMLParser.parse(html);
				abstract = (root.querySelector('#enc-abstract').innerText);
				abstract = abstract.replace(/(\n)/g, "-")
				if(abstract.length > 2000){
					abstract = abstract.substr(0, 2000) + "..."
				}
				console.dir(abstract)
				let doiPosition = html.indexOf('doi');
				let doiEnd = (html.length - doiPosition) * (-1)
				console.log(doiPosition);
				if(doiPosition === -1){
					return message.channel.send(`Error: \'doi\' position of - 1`)
				}
				let doiRaw = html.slice(doiPosition + 4, doiPosition + 100)
				console.log(doiRaw);
				let commaPosition = doiRaw.indexOf(',')
				doi = doiRaw.slice(0, commaPosition)
				// const urlPubmed = new URL(args[0]);
				// let urlNoSlashes = urlPubmed.pathname.slice(1, -1)
				// console.log(`https://sci-hub.do/${urlNoSlashes}`);
				// let doi = (data.records[0].doi);
			 	scihubUrl = `https://sci-hub.do/${doi}`
       return fetch(`https://sci-hub.do/${doi}`)
			})
			.then(res => {
				console.log(res.status);
				return res.text()
			})
			.then(html => {
				const root = HTMLParser.parse(html);
				let citation = (root.querySelector('#citation').innerHTML);
				let citationArr = citation.split("<i>").join("_!_").split("</i>").join("_!_").split("_!_")
				console.table(citationArr)
				const [authorAndYear, title] = [citationArr[0], citationArr[1]];
				console.log(authorAndYear)
				console.log(title);



				const exampleEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(title)
				.setAuthor(authorAndYear)
				.setDescription(abstract)
				// .setThumbnail('https://i.imgur.com/wSTFkRM.png')
				.addFields(
					{ name: 'DOI', value: doi },
					// { name: '\u200B', value: '\u200B' },
					// { name: 'Inline field title', value: 'Some value here', inline: true },
					// { name: 'Inline field title', value: 'Some value here', inline: true },
				)
				// .addField('Inline field title', 'Some value here', true)
				// .setImage('https://i.imgur.com/wSTFkRM.png')
				.setTimestamp()
				// .setFooter('Bot by blonskie');

			message.channel.send(exampleEmbed);

			})
			.catch(err => {
          console.log(`error ${err}`)
					message.channel.send(`Error: ${err}`);
      });

	},
};

// <span class="citation-doi">
// 			 doi: 10.1016/j.sleep.2018.09.008.
// 		 </span>

 // <span class="docsum-journal-citation full-journal-citation">Otolaryngol Head Neck Surg. 2015 Sep;153(3):326-33. doi: 10.1177/0194599815594374. Epub 2015 Jul 16.</span>

//
// 	message.channel.send(`first argument ${args[0]}`);
// }
// else if (command === 'avatar') {
// 	if (!message.mentions.users.size) {
// 		return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
// 	}
// 	const avatarList = message.mentions.users.map(user => {
// 	return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
// 	});
// 	console.log(avatarList);
//
// 	// send the entire array of strings as a message
// 	// by default, discord.js will `.join()` the array with `\n`
// 	message.channel.send(avatarList);
//
// // ...
// }


// `https://www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?tool=my_tool&email=my_email@example.com&ids=${inputedID}`
