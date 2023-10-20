const crypto = require('crypto')

let authedUsers = {}

function manageUserTokens(){
	let tokenIds = Object.keys(authedUsers)
	tokenIds.forEach(tokenId => {
		if(authedUsers[tokenId]){
			let oldTimestamp = authedUsers[tokenId].timestamp
			let newTimestamp = parseInt((Math.floor(new Date())/1000).toFixed())
			if((newTimestamp - oldTimestamp) >= 3600 * 24){
				delete authedUsers[tokenId]
			}
		}
	})
}

function checkUserToken(token){
	if(authedUsers[token]){
		authedUsers[token].timestamp =  parseInt((Math.floor(new Date())/1000).toFixed())
	}
	return authedUsers  && authedUsers[token]
}

function main(firebase, req, res){

        let subOperation = req.query.op
	let user = null
	let password = null
	let level = null
	let token = null

        switch(subOperation){

                case 'create':
			user = req.query.user
			password = req.query.password
			level = req.query.level

			let userRef = firebase.database().ref("Users").child(level).child(user)
			userRef.on('value', snapshot => {
				userRef.off()
				let data = snapshot.val()

				if(data){

					let storedHash = data.hash
					let authedHash = crypto.createHash('sha256').update(password).digest("hex")
					let token = crypto.createHash('sha256').update(`${Math.random()}`).digest("hex")
					let timestamp = parseInt((Math.floor(new Date())/1000).toFixed())

					if(storedHash === authedHash){
						authedUsers[token] = {user:user, date: Date(), timestamp: timestamp}
						res.json({message:token, errorCode:200})
					}else{
						res.json({message:"Access Denied", errorCode:403})
					}
				}else{
					 res.json({message:"Access Denied", errorCode:403})
				}
			})
                        break


                case 'delete':
			token = req.query.token
			if(authedUsers[token]){
				delete authedUsers[token]
                        	res.json({message:"DELETE", errorCode:200})
			}else{
                        	res.json({message:"DELETE ERROR", errorCode:404})
			}
                        break

                default:
                        res.json({message:"Invalid Operation", errorCode:404})

        }
}


module.exports = { main: main, authd: checkUserToken, tokenCheck: manageUserTokens }
