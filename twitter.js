/*
 * Codebits 2014
 * by: João Oliveira (@joao_oliveira)
 */


var codebits = require('codebits');
var twitters = returned = 0;

codebits.auth.logIn('email@email.com', '*****', function (err, token) {

	if(err)	{ throw err };

	// Iterate through accepted users with javascript skills
	codebits.users.listAcceptedUsers('javascript', function (err, reply){
		if(err) { throw err; returned++ }

		// Iterate through each user info
		for(var i in reply) {
			if(reply.hasOwnProperty(i)) {
			   	codebits.users.getUserbyID(reply[i].id, function(err, user) {
			   		returned++;

			   		if(user.twitter) {
			   			console.log(user.twitter);
			   			twitters++;
			   		}

			   		if(returned === reply.length) {
		   	   			console.log('JavaScript ppl com Twitter handle: ' + twitters);
		   	   		}

			   	});
		   }
		}
	});

});