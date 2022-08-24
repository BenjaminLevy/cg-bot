module.exports = {
		name: 'args-info',
	description: 'returns username and user ID',
	args: true,
	execute(message, args) {
 			if (args[0] === 'foo') {
				return message.channel.send('bar');
			}

			message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};

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
// 	logger.debug(avatarList);
//
// 	// send the entire array of strings as a message
// 	// by default, discord.js will `.join()` the array with `\n`
// 	message.channel.send(avatarList);
//
// // ...
// }
