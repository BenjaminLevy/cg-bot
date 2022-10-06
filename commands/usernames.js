const { Channel } = require("discord.js");
const logger = require("../utils/logger")

const flatCache = require('flat-cache');
const cache = flatCache.load('username-cache');

module.exports = {
	name: 'usernames',
	description: 'Fetches history of usernames',
	execute(message, args) {
		logger.debug(cache.all())	
		
	},
};



