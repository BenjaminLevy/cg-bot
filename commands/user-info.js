module.exports = {
	name: 'user-info',
	description: 'returns username and user ID',
	execute(message, args) {
		 message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
};
