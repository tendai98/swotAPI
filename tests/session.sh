#!/bin/bash

function createSession(){
	curl "http://127.0.0.1:5000/api?cmd=session&op=create&user=manager101&password=12345678&level=Manager"
	echo
}


function deleteSession(){
	curl "http://127.0.0.1:5000/api?cmd=session&op=delete&token=24a5253159f33681609395c2d25f9c82206948d8043e18ec61e463759a5c0220"
	echo
}


createSession
deleteSession
