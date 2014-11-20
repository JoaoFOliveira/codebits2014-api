/*
 * Codebits 2014
 * by: João Oliveira (@joao_oliveira)
 */


var codebits = require('codebits');
var babes = returned = 0;
var weirdBabeNames = ['Inês','Beatriz','Melanie','Astrid']

function getUser(user) {
   	codebits.users.getUserbyID(user.id, function(err, user) {
   		returned++;

   		var name = user.name; var nameArr = name.split(' '); var fn = nameArr[0]; var x = '';
   		var isBabe = fn.slice(-1) === 'a' || weirdBabeNames.indexOf(fn)>-1;
   		if(isBabe) {
   			babes++;
   			x = ' - IT\'S A BABE!';
   		}

   		console.log(fn + x);

   		if(returned === user.length) {
   			console.log('Babes: ' + babes);
   		}
   	});
}

codebits.auth.logIn('email@email.com', '*****', function (err, token) {

	if(err)	{ throw err };

	// Iterate through accepted users
	codebits.users.listAcceptedUsers(function (err, reply){
		if(err) { throw err; returned++ }

		// Iterate through each user info
		for(var i in reply) {
			if(reply.hasOwnProperty(i)) {
				getUser(reply[i]);
			}
		}
	});

});