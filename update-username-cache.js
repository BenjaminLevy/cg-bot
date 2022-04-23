var flatCache = require('flat-cache');
const cache = flatCache.load('username-cache');
const userHistoryChannelID = process.env.userHistoryChannelID;
const serverID = process.env.serverID;


module.exports = async function (client, GuildMember = undefined){
  try{ 
    if(!GuildMember) {
    
    let guild = await client.guilds.cache.get(serverID);
    let membersMap = await guild.members.fetch()
     
    for (const [key,value] of membersMap) {
      let GuildMember = membersMap.get(key)
     
      checkUser(client, GuildMember)
    }
      
    }
    else {
      checkUser(client, GuildMember)
    }
  }
  catch(error){
    console.error(error)

    client.channels.cache.get(userHistoryChannelID).send(`Username cache error: ${error}`)
  }
}

async function checkUser(client, GuildMember){
  try{
    let username = GuildMember.user.username;
    let id = GuildMember.user.id;
    
    //Returns array of user's past usernames
    let cachedUsernameArray = await cache.getKey(id);
    console.log(`Cached username array:${cachedUsernameArray}`)
    /* If id is not in cache, insert into cache with
    the id as key and array with username as value */
    if(cachedUsernameArray === undefined){
      let usernameArray = [username]
      await cache.setKey(id, usernameArray)
      client.channels.cache.get(userHistoryChannelID).send(`NEW username: ${username}`)
      console.log(`NEW username: ${username}`) 
    }
    else if(cachedUsernameArray[0] != username){
      cachedUsernameArray.unshift(username);
      console.log(`here's the username array before being set as a key${cachedUsernameArray}`)
      await cache.setKey(id, cachedUsernameArray);
       console.log(`cache.getKey(id): ${cache.getKey(id)}`)
      client.channels.cache.get(userHistoryChannelID).send(`CHANGED username: "${cachedUsernameArray[1]}" is now "${cachedUsernameArray[0]}"`);
      console.log(`CHANGED username: "${cachedUsernameArray[1]}" is now "${cachedUsernameArray[0]}"`);
    }

    cache.save()
  }
  catch(error){
    console.error(`Error in checkUser: ${error}`)
  }
  
}
