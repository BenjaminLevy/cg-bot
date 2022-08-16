//This import necessary? TODO test without this
const Discord = require('../node_modules/discord.js');

module.exports = {
	name: 'scihub',
	aliases: ['s'],
	description: 'takes pubmed link and returns scihub link',
	args: true,
	async execute(message, args) {
		const HTMLParser = require('node-html-parser');
		const fetch = require("../node_modules/node-fetch");


		/*If second argument (domain arg) is provided, use it as Scihub top-level domain.
		Else, default to domain defined in config.json*/
		const scihubTopLevelDomain = args[1] ? args[1] : process.env.scihubTopLevelDomain 
		
		try{
			const url = args[0]
			let res = await fetch(url);
			res = await res.text();

			const root = HTMLParser.parse(res);
			const paper = new Paper(root, scihubTopLevelDomain)
			console.log(paper);
			message.channel.send(paper.createEmbed())

		}
		catch (error){
			console.log(error)	
		}
		

	},
};

class Paper{

	

	constructor(root, scihubTopLevelDomain){
		
		this.abstract = root.querySelector('#enc-abstract').querySelector('p').innerText

		this.title = root.querySelector('meta[name="citation_title"]')._attrs.content
		this.doi = root.querySelector('meta[name="citation_doi"]')._attrs.content
		this.date = root.querySelector('meta[name="citation_date"]')._attrs.content
		this.authors = root.querySelector('meta[name="citation_authors"]')._attrs.content
		this.journal = root.querySelector('meta[name="citation_journal_title"]')._attrs.content
		this.pmid = root.querySelector('meta[name="citation_pmid"]')._attrs.content

		this.scihubTopLevelDomain = scihubTopLevelDomain;

	}

	createEmbed(){
		const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(this.title)
				.setURL(`https://sci-hub.${this.scihubTopLevelDomain}/${this.doi}`)
				.setAuthor(`${this.authors} ${this.date}`)
				.setDescription(
					this.abstract.length > 2000 ? this.abstract.substr(0, 2000) + "..." : this.abstract
					)
				// .setThumbnail('https://i.imgur.com/wSTFkRM.png')
				.addFields(
					{ name: 'DOI', value: this.doi, },
					{ name: 'PMID', value: this.pmid },
					// { name: 'Inline field title', value: 'Some value here', inline: true },
					// { name: 'Inline field title', value: 'Some value here', inline: true },
				)
				// .addField('Inline field title', 'Some value here', true)
				// .setImage('https://i.imgur.com/wSTFkRM.png')
				.setTimestamp()
				// .setFooter('Bot by blonskie');

			return(embed)
	}
}