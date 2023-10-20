const cors = require("cors")
const express = require("express")
const firebase = require("firebase")

const swotModule = require("./modules/swot-mod")
const controlModule = require("./modules/control-mod")
const sessionModule = require("./modules/session-mod")

const projectConfig = require("./json/app.json")
const systemCreds = require("./json/auth.json")

const SERVER_PORT = process.env.PORT || 5000
const app = express(cors())

let apiModules = {}
let lockedModules = ["swot"]
let systemAuth = false

firebase.initializeApp(projectConfig)

function authSystem(req, res, callback){

	firebase.auth().signInWithEmailAndPassword(
			systemCreds.api.email,
			systemCreds.api.password).then( e => {
				systemAuth = true
				callback(firebase, req, res)
			}).catch( e => {
				res.end()
			})
}

function apiPoint(req, res){

    let module = null
    let token = null

   sessionModule.tokenCheck()

    if(systemAuth){
		module = req.query.cmd
		token = req.query.token

		if(apiModules[module]){
			if(lockedModules.includes(module)){
				if(sessionModule.authd(token)){
					apiModules[module](firebase, req, res)
				}else{
					res.json({message:"Access Denied", errorCode:403})
				}
			}else{
				apiModules[module](firebase, req, res)
			}
		}else{
			res.json({message:"Operation not supported", errorCode:404})
		}
    }else{
		module = req.query.cmd
		token = req.query.token

		if(apiModules[module]){
			if(lockedModules.includes(module)){
				if(sessionModule.authd(token)){
					authSystem(req, res, apiModules[module])
				}else{
					res.json({message:"Access Denied", errorCode:403})
				}
            		}else{
				authSystem(req, res, apiModules[module])
			}
		}else{
			res.json({message:"Operation not supported", errorCode:404})
		}
	}

}


apiModules['swot'] = swotModule.main
apiModules['control'] = controlModule.main
apiModules['session'] = sessionModule.main

app.get("/", function(req, res){ res.end() })
app.get("/api", apiPoint)
app.listen(SERVER_PORT, () => { console.log("SERVER: ONLINE") })
