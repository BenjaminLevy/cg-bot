module.exports = function { 
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
}