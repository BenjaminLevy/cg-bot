const { Channel } = require("discord.js");

const flatCache = require('flat-cache');
const cache = flatCache.load('freshCache');

module.exports = {
	name: 'usernames',
	description: 'Fetches history of usernames',
	execute(message, args) {
		console.log(cache.all())	
		
	},
};



