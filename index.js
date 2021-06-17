const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const flatCache = require('flat-cache');

const cache = flatCache.load('userCache5');

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
	server.members.cache.forEach(function (m){
		let oldUsernames = cache.getKey(m.user.id)
		console.log(oldUsernames)
		if(cache.getKey(m.user.id) === undefined){
			
			cache.setKey(m.user.id, [{user: m.user.username, date: Date()}])

		}
		else if(oldUsernames[0].user !== m.user.username){
			oldUsernames.unshift({user: m.user.username, date: Date()})
			cache.setKey(m.user.id, oldUsernames)
		
		}
		else
		console.log(`${m.user.id} has their old name`);
		})
	console.log('Cache complete');
	console.log(cache.all())
	cache.save()
	} catch (error) {
		console.error(error);
	}
});

// const list = client.guilds.cache.get("803429347750576138");
// console.log(list.members.cache.array());



// Go through each of the members, and console.log() their name
 

// list.members.fetch().then(members => console.log(members))
const cron = require('cron');

let counter = 0
let scheduledMessage = new cron.CronJob('0 * * * * *', () => {
  // This runs every day at 10:30:00, you can do anything you want
  	const guild = client.guilds.cache.get('803429347750576138');
	const channel = guild.channels.cache.get('831411449426477057');
  channel.send(counter);
  counter += 1
});


// When you want to start it, use:
scheduledMessage.start()


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
		message.reply('there was an error trying to execute that command!');
	}



	});


client.login(token);
