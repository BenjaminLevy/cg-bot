module.exports = {
		name: 'scihub',
		aliases: ['s'],
	description: 'takes pubmed link and returns scihub link',
	args: true,
	execute(message, args) {
		let inputedID = args[0]
		let returnedObject = `https://www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?tool=my_tool&email=my_email@example.com&ids=${inputedID}&format=json`

		message.channel.send();
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
// 	console.log(avatarList);
//
// 	// send the entire array of strings as a message
// 	// by default, discord.js will `.join()` the array with `\n`
// 	message.channel.send(avatarList);
//
// // ...
// }


// `https://www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?tool=my_tool&email=my_email@example.com&ids=${inputedID}`
