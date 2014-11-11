/*
 * Codebits 2014
 * by: João Oliveira (@joao_oliveira)
 */


var codebits = require('codebits');
var pussies = returned = 0;

codebits.auth.logIn('email@email.com', '*****', function (err, token) {

	if(err)	{ throw err };

	// Iterate through accepted users with javascript skills
	codebits.users.listAcceptedUsers(function (err, reply){
		if(err) { throw err; returned++ }

		// Iterate through each user info
		for(var i in reply) {
			if(reply.hasOwnProperty(i)) {
			   	codebits.users.getUserbyID(reply[i].id, function(err, user) {
			   		returned++;
			   		if(user.checkin_date === '0') {
			   			console.log('Mr.Pussy ' + user.name + ' did not show up!');
			   			pussies++;
			   		}

			   		if(returned === reply.length) {
		   	   			console.log('There is a herd of ' + pussies + ' pussies');
		   	   		}

			   	});
		   }
		}
	});

});