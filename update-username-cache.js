var flatCache = require('flat-cache');
const cache = flatCache.load('freshCache02');
// const { , serverID } = require('./config.json')
const userHistoryChannelID = process.env.userHistoryChannelID;
const serverID = process.env.serverID;

//TODO add error handling
//TODO remove repitition

module.exports = async function (client, GuildMember = undefined){
  if(!GuildMember) {
    
    let guild = client.guilds.cache.get(serverID);
    let membersMap = await guild.members.fetch()
     
    for (const [key,value] of membersMap) {
      let GuildMember = membersMap.get(key)
     
      checkUser(client, GuildMember)
      .catch((errors) => { console.log(errors) })  

    }
      
  }
  else {
    checkUser(client, GuildMember)
    .catch((errors) => { console.log(errors) })
		
  }
  cache.save()
}

async function checkUser(client, GuildMember){

    
    let username = GuildMember.user.username;
    let id = GuildMember.user.id;
  
    //Returns array of usernames
    //Need await here?
    let cachedUsernameArray = await cache.getKey(id);
    console.log(cachedUsernameArray)

    /* If id is not in cache, insert into cache with
    the id as key and array with username as value */
    if(cachedUsernameArray === undefined){
      let usernameArray = [username]
      cache.setKey(id, usernameArray)
      client.channels.cache.get(userHistoryChannelID).send(`NEW username: ${username}`)
      console.log(`NEW username: ${username}`) 
    }
    else if(cachedUsernameArray[0] != username){
      cachedUsernameArray.unshift(username);
      cache.setKey(id, cachedUsernameArray);
      client.channels.cache.get(userHistoryChannelID).send(`CHANGED username: "${cachedUsernameArray[1]}" is now "${cachedUsernameArray[0]}"`);
      console.log(`CHANGED username: "${cachedUsernameArray[1]}" is now "${cachedUsernameArray[0]}"`);
    }

  
  
}
