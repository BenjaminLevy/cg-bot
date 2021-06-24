const flatCache = require('flat-cache');
const cache = flatCache.load('userCache8');
const { userHistoryChannelID } = require('../config.json');
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
		let usersPastNamesArr = cache.getKey(user.id);
		let messageToSend = '```'
		for(let i = 0; i < usersPastNamesArr.length; i++){
			messageToSend += (usersPastNamesArr[i].user + '....' + usersPastNamesArr[i].date + '\n')
		}
		messageToSend += '```'
		alertChannel.send(messageToSend)
	}
}
