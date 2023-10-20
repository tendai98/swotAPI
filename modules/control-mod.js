const crypto = require("crypto")

let systemAuth = false
let tokens = []

function main(firebase, req, res){

	let app = firebase.app()
        let subOperation = req.query.op
	let token = null
	let username = null
        let password = null
	let level = null

        switch(subOperation){
		case 'auth':
	                username = req.query.username
        	        password = req.query.password

			if(tokens.length > 20){
				tokens = []
			}

			app.auth().signInWithEmailAndPassword(username,password)
				.then( e => {
					systemAuth = true
					let randomNumber = Math.random()
					let token = crypto.createHash('sha256').update(`${randomNumber}`).digest("hex")
					tokens.push(token)
					res.json({message:token, errorCode:200})
                       		}).catch( e => {
					res.end()
                       		})
			break

                case 'create':
			token = req.query.token

			if(token && systemAuth && tokens.includes(token)){
				username = req.query.user
				password = req.query.password
				level = req.query.level

				let hash = crypto.createHash('sha256').update(`${password}`).digest('hex')
				firebase.database().ref("Users").child(level).child(username)
					.set({hash:hash, password:password, date: Date()}).then( e => {
						res.json({message:"CREATE", errorCode:200})
					}).catch(e => {
						res.end()
					})
			}else{
				res.json({message:"Access Denied", errorCode:403})
			}
                        break

                case 'read':
			token = req.query.token

			if(token && systemAuth && tokens.includes(token)){
				level = req.query.level
				let userRef = firebase.database().ref("Users")
				userRef.on('value', snapshot => {
					userRef.off()
					let dataSnapshot = snapshot.val()
					if(dataSnapshot){
						res.json({message:dataSnapshot, errorCode:200})
					}else{
						res.json({message:{}, errorCode:200})
					}
				})
			}else{
				res.json({message:"Access Denied", errorCode:403})
			}
                        break

                case 'delete':
			token = req.query.token

                       	if(token && systemAuth && tokens.includes(token)){
                                username = req.query.user
                                level = req.query.level

                                firebase.database().ref("Users").child(level).child(username).remove()
                                res.json({message:"DELETE", errorCode:200})
                        }else{
                                res.json({message:"Access Denied", errorCode:403})
                        }
                        break

                default:
                        res.json({message:"Invalid Operation", errorCode:404})

        }
}


module.exports = { main: main }
