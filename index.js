const isDevelopment = process.env.NODE_ENV === "development"
const logger = require('./utils/logger')
logger.info(`NODE_ENV === ${process.env.NODE_ENV}`)
const fs = require('fs');
const Discord = require('discord.js');
const { Intents } = require('discord.js')
if (isDevelopment) {
  require('dotenv').config();
}
//const discordToken = secretsJSON.discordToken
const cron = require('cron');
const terminate = require('./utils/terminate')
const prefix = "!"
// const updateUsernameCache = require('./update-username-cache') 



const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS] });
const getAWSSecrets = require('./utils/getAWSSecrets')
let secretsJSON
getAWSSecrets()
	.then(res => JSON.parse(res))
	.then(data => {
		secretsJSON = data
	})
	.then(() => {
		client.login(secretsJSON.discordToken)
	})
	.catch(err => {
		console.log(err)
	})
	
	
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();



client.once('ready', () => {
	console.log('I am ready!');
	// updateUsernameCache(client);
});

client.on("guildMemberUpdate", function(oldMember, newMember){
	// updateUsernameCache(client, newMember)
		// .catch((errors) => {
		// 	console.log(errors)
		// })
	
});

//TODO trigger updateUsernameCache when a guild member joins the server
client.on("guildMemberAdd", function(newMember){
	// updateUsernameCache(client, newMember)
});

// const list = client.guilds.cache.get("803429347750576138");
// logger.debug(list.members.cache.array());



// Go through each of the members, and console.log() their name
 

// list.members.fetch().then(members => console.log(members))

let counter = 0
// let scheduledMessage = new cron.CronJob('* 00 * * * *', () => {
//   	updateUsernameCache(client)
// 	console.log('cache updated ' + Date());
// });


// When you want to start it, use:
// scheduledMessage.start()

client.on(
  'message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const commandName = args.shift().toLowerCase();

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
		message.reply('Error:' + error);
	}



	});

const exitHandler = terminate(client)

process.on('uncaughtException', exitHandler);
process.on('unhandledRejection', exitHandler);
process.on('SIGINT', exitHandler)
process.on('SIGTERM', exitHandler)

