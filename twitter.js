/*
 * Codebits 2014
 * by: João Oliveira (@joao_oliveira)
 */


var codebits = require('codebits');
var twitters = returned = 0;

function getUser(user) {
   	codebits.users.getUserbyID(user.id, function(err, user) {
   		returned++;

   		if(user.twitter) {
   			console.log(user.twitter);
   			twitters++;
   		}

   		if(returned === user.length) {
   			console.log('JavaScript ppl com Twitter handle: ' + twitters);
   		}

   	});
}

codebits.auth.logIn('email@email.com', '*****', function (err, token) {

	if(err)	{ throw err };

	// Iterate through accepted users with javascript skills
	codebits.users.listAcceptedUsers('javascript', function (err, reply){
		if(err) { throw err; returned++ }

		// Iterate through each user info
		for(var i in reply) {
			if(reply.hasOwnProperty(i)) {
			   	getUser(reply[i]);
		   }
		}
	});

});