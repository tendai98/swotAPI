#!/bin/bash

function authUser(){
	curl 'http://127.0.0.1:5000/api?cmd=control&op=auth&username=admin.controller@system.net&password=quarks_leptons3e8'
	echo
}

function createUser(){
	curl "http://127.0.0.1:5000/api?cmd=control&op=create&level=Manager&user=manager101&password=12345678&token=5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
	curl "http://127.0.0.1:5000/api?cmd=control&op=create&level=Manager&user=manager102&password=12345678&token=5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
	curl "http://127.0.0.1:5000/api?cmd=control&op=create&level=Manager&user=manager103&password=12345678&token=5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
	curl "http://127.0.0.1:5000/api?cmd=control&op=create&level=Manager&user=manager104&password=12345678&token=5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
	echo
}

function readUsers(){
	curl "http://127.0.0.1:5000/api?cmd=control&op=read&level=Manager&token=5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
	echo
}

function deleteUser(){
	curl "http://127.0.0.1:5000/api?cmd=control&op=delete&user=manager104&level=Manager&token=5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
	echo
}


authUser
createUser
readUsers
deleteUser
