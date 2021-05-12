const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();



client.once('ready', () => {
	console.log('Ready!');
	let server = client.guilds.cache.get("803429347750576138");
	try{
	console.log(server.members.cache.forEach(m => console.log(m.user.id + " " + m.user.username)))
	} catch (error) {
		console.error(error);
	}
});

// const list = client.guilds.cache.get("803429347750576138");
// console.log(list.members.cache.array());



// Go through each of the members, and console.log() their name
 

// list.members.fetch().then(members => console.log(members))

client.on(
  'message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const commandName = args.shift().toLowerCase();

	// if (!client.commands.has(commandName)) return;
	//
	// const command = client.commands.get(commandName);

	const command = client.commands.get(commandName)
	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && !args.length) {
	return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	try {
	command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}



	});


client.login(token);
