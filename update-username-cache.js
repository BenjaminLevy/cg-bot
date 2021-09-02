const flatCache = require('flat-cache');
const cache = flatCache.load('freshCache01');
const { userHistoryChannelID, serverID } = require('./config.json')



module.exports = function (client){

    let guild = client.guilds.cache.get(serverID);
	// let str = "Members:\n";

	// let x = guild.members.cache
  //  .each(m => {
  //    str += `\nName: ${m.user.username} ID: ${m.id}`

  //  });
  //  console.log( str );
 guild.members.fetch()
  .then(item => item.forEach(checkUsernameAgainstCache))
  .catch(console.error); 
}

function checkUsernameAgainstCache(value, key, map){
  
let username = map.get(key).user.username
let id = map.get(key).user.id

console.log("99999999999999999999999999999999999999999")
}


// module.exports = function (client){
//     let guild = client.guilds.cache.get("731543013846941736");
// 	try{
// 	guild.members.cache.forEach(function (m){
// 		let oldUsernames = cache.getKey(m.user.id)
// 		// console.log(oldUsernames)
// 		if(cache.getKey(m.user.id) === undefined){
			
// 			cache.setKey(m.user.id, [{user: m.user.username, date: Date()}])
// 			let newUsername = cache.getKey(m.user.id)[0].user
// 			console.log(`NEW...${newUsername}`);
			
// 		}
// 		else if(oldUsernames[0].user !== m.user.username){
// 			oldUsernames.unshift({user: m.user.username, date: Date()})
// 			let previousUsername = cache.getKey(m.user.id)[1].user
// 			cache.setKey(m.user.id, oldUsernames)
// 			let newUsername = cache.getKey(m.user.id)[0].user
// 			console.log(`CHANGED...${newUsername}`);
// 			const channel = guild.channels.cache.get(userHistoryChannelID);
//   			channel.send(`CHANGED: ${previousUsername} is now ${newUsername}`);
// 		}
// 		else{
// 			let allNames = cache.getKey(m.user.id);
// 			console.log("username cache else")
// 			for(let i = 0; i < allNames.length; i++){
// 				console.log(allNames[i].user);
// 			}
// 			console.log(`old...${oldUsernames[0].user}`);
// 		}
// 	})
// 	console.log('Cache complete');
// 	// console.log(cache.all())
// 	cache.save()
// 	} catch (error) {
// 		console.error(error);
//     }
// }
