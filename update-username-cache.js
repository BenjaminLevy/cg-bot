var flatCache = require('flat-cache');
const cache = flatCache.load('freshCache02');
const { userHistoryChannelID, serverID } = require('./config.json')



module.exports = async function (client){

 let guild = client.guilds.cache.get(serverID);
 let membersMap = await guild.members.fetch()

  for (const [key,value] of membersMap) {

    let username = membersMap.get(key).user.username;
    let id = membersMap.get(key).user.id;
  
    //Returns array of usernames
    let cachedUsernameArray = cache.getKey(id);

    //Sets cachedUsedname to most recent username in cachedUsernameArray
    // let cachedUsername = cachedUsernameArray[0]

    /* If id is not in cache, insert into cache with
    the id as key and array with username as value */
    if(cachedUsernameArray === undefined){
      let usernameArray = [username]
      cache.setKey(id, usernameArray)
      console.log(`NEW username: ${username}`) 
    }
    else if(cachedUsernameArray[0] != username){
      cachedUsernameArray.unshift(username);
      cache.setKey(id, cachedUsernameArray);
      console.log(`CHANGED username: "${cachedUsernameArray[1]}" is now ${cachedUsernameArray[0]}`)
    }
  }
  cache.save();
}

function checkAllUsers(){
  
}