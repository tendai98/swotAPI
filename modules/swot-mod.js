const crypto = require("crypto")

function getHashID(data){
    let hash = crypto.createHash("sha256").update(data).digest("hex")
    return hash
}


function  main(firebase, req, res){

	let subOperation = req.query.op

	switch(subOperation){
		case 'create':

			let projectName = req.query.name
			let userLevel = req.query.level
			let createdBy = req.query.creator
			let creationDate = Date()
			let projectId = getHashID(projectName)
			let swotObject = {}

			swotObject.name = projectName
			swotObject.level = userLevel
			swotObject.creator = createdBy
			swotObject.created = creationDate

			swotObject.parameters = { }
			swotObject.parameters.strength = 0
			swotObject.parameters.weaknesses = 0
			swotObject.parameters.opportunites = 0
			swotObject.parameters.threats =	0

			firebase.database().ref("SWOT_Objects").child(userLevel).child(createdBy).child(projectId)
				.set(swotObject).then(e => {
					res.json({op:"CREATE", message:projectId, errorCode:200})
					firebase.database().ref("Active_SWOT_Objects").child(projectId).set({name: projectName, user: createdBy, date:creationDate})
				}).catch(e => {
					res.end()
				})

			break

		case 'read':

			let user = req.query.user
			let level = req.query.level
			let targetSWOTNode = firebase.database().ref("SWOT_Objects").child(level).child(user)

			targetSWOTNode.on("value", snapshot => {
				let userLevelNode = snapshot.val()
				targetSWOTNode.off()

				if(userLevelNode){
					res.json({op:"READ", message:userLevelNode, errorCode:200})
				}else{
					res.json({op:"READ", message:"ERROR", errorCode:404})
				}
			})

			break

		case 'list':
			let activeSWOTRef = firebase.database().ref("Active_SWOT_Objects")

			activeSWOTRef.on("value", snapshot => {
				let dataObject = snapshot.val()
				activeSWOTRef.off()

				if(dataObject){
					res.json({op:"LIST", message:dataObject, errorCode:200})
				}else{
					res.json({op:"LIST", message:"ERROR", errorCode:404})
				}
			})

			break

		case 'update':
			let query = req.query


			let tlevel = query.level
			let destination = query.destination
			let sourceId = query.id
			let comment = query.comment
			let score = query.score
			let target = query.target
			let swotid = query.swotid

			var swotEntryObject = { score: score, comment: comment  }

			firebase.database().ref("SWOT_Objects")
				.child(tlevel)
				.child(destination)
				.child(swotid)
				.child('parameters')
				.child(target)
				.child(sourceId)
				.child(Math.floor(new Date()).toString())
				.set(swotEntryObject)
				.then(e => {
                                        res.json({op:"UPDATE", message:swotid, errorCode:200})
                                }).catch(e => {
                                        res.end()
                                })

			break

		case 'delete':
			let objectLevel = req.query.level
			let objectUser = req.query.creator
			let objectId = req.query.id

			firebase.database().ref("SWOT_Objects")
				.child(objectLevel)
				.child(objectUser)
				.child(objectId).remove()

			firebase.database().ref("Active_SWOT_Objects").child(objectId).remove()

			res.json({message:"DELETE", errorCode:200})
			break

		default:
			res.json({message:"Invalid Operation", errorCode:404})
	}
}

module.exports = { main: main }
