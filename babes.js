/*
 * Codebits 2014
 * by: João Oliveira (@joao_oliveira)
 */


var codebits = require('codebits');
var babes = returned = 0;
var weirdBabeNames = ["Inês","Beatriz","Melanie","Astrid"]

codebits.auth.logIn('email@email.com', '********', function (err, token) {

	if(err)	throw err;

	// Iterate through accepted users
	codebits.users.listAcceptedUsers(function (err, reply){
		if(err) { throw err; returned++ }

		// Iterate through each user info
		for(var i in reply) {
		   	codebits.users.getUserbyID(reply[i].id, function(err, user) {
		   		returned++;

		   		var name = user.name; var nameArr = name.split(" "); var fn = nameArr[0]; var x = "";
		   		var is_babe = fn.slice(-1) === "a" || weirdBabeNames.indexOf(fn)>-1;
		   		if(is_babe) {
		   			babes++;
		   			x = " - IT'S A BABE!";
		   		}

		   		console.log(fn + x);

		   		if(returned === reply.length) {
	   	   			console.log("Babes: " + babes);
	   	   		}

		   	});
		}
	});

});