/*
 * Codebits 2014
 * by: João Oliveira (@joao_oliveira)
 */


var codebits = require('codebits');
var returned = 0;

codebits.auth.logIn('email@email.com', '*****', function (err, token) {

	if(err)	{ throw err };

	// Iterate through projects
	codebits.projects.listProjects(function (err, reply){

		// Iterate through each user info
		for(var i in reply) {
		   	codebits.projects.getProjectInfo(reply[i].id, function(err, project) {
		   		if(err) { throw err; returned++ }
		   		returned++;

		   		console.log('Title: ' + project.title);
		   		console.log('URL: ' + project.url);
		   		console.log('Description:  ' + project.description);
		   		console.log();
		   		console.log('----------------------------------------------');
		   		console.log();

		   		if(returned === reply.length) {
	   	   			console.log('Number of projects: ' + returned);
	   	   		}

		   	});
		}
	});

});