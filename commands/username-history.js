const flatCache = require('flat-cache');
const cache = flatCache.load('username-cache');
const userHistoryChannelID = process.env.userHistoryChannelID;
const Discord = require('discord.js');
module.exports = {
	name: 'history',
	aliases: ['h'],
	description: 'returns all of users past usernames',
	args: true,
	execute(message, args) {
		let alertChannel = message.guild.channels.cache.get(userHistoryChannelID)
		const client = new Discord.Client();
		let user = message.mentions.users.first()
		if(!user) return;
		logger.debug(user.id)
		let usersPastNamesArr = cache.getKey(user.id);
		let messageToSend = '```'
		logger.debug(usersPastNamesArr);
		for(let i = 0; i < usersPastNamesArr.length; i++){
			messageToSend += (usersPastNamesArr + '\n')
		}
		logger.debug(messageToSend)
		messageToSend += '```'
		alertChannel.send(messageToSend)
	}
}
