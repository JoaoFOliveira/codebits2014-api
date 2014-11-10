/*
 * Porto 2014
 * by: João Oliveira (@joao_oliveira)
 */

var fs = require('fs');
var lazy = require('lazy');

var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: '*****',
    consumerSecret: '*****',
    callback: 'http://www.site.com'
});

var accessToken = '*****';
var accessTokenSecret = '*****';

var handles = Array();
var count = 0;

var randomMsg = [
  'nice seeing you at Codebits! Fancy JavaScript, right? :)',
  'i see you and your JavaScript skills! :)',
  'wanna join a great JavaScript community? :)',
  'last weekend was awesome, imagine a JavaScript event! :)',
  'hi! Have any good JavaScript event ideas for us? :)',
  'what if i told you semi colons in JavaScript are optional? Haha :)',
  'ask not what JavaScript can do for you, but what ideas you have for us! :)',
  'i can feel you can code. Better yet, you do it in JavaScript! :)',
  'such JavaScript skills, much awesome community! :)',
  'JavaScript ftw, right? right?? :)'];

new lazy(fs.createReadStream('./logs/twitter.txt'))
    .lines
    .forEach(function(line){
      handles.push(line.toString());
    }
).on('pipe', function(){
  getFollowers(-1);
});

function getFollowers(page) {
	twitter.followers('list', { screen_name:'opojs', cursor: page, count:200 },accessToken, accessTokenSecret, function(error, data, response) {
	    if (error) {
	        console.log(error);
	    } else {
        var users = data.users;
        handles.forEach(function(handle){
          var exists = false;
          data.users.forEach(function(user){
            if(user['screen_name'].toLowerCase() == handle) exists = true;
          });
          if(!exists) {

            // sendTweet(handle); // You mad? Check count, check already sent tweets and stop this before we get permabanned!

            console.log('Soon gonna tweet ' + handle);
            count++;
          }
        });


        if(data.next_cursor !== 0) {
          getFollowers(data.next_cursor);
        } else {
          console.log('Let\'s ship ' + count + ' tweets');
        }

	    }
	});
}

function sendTweet(handle) {
  var r = getRandomInt(0, 9);
  var statusMsg = '@' + handle + ' ' + randomMsg[r];
  twitter.statuses('update', {
        status: statusMsg
    },
    accessToken,
    accessTokenSecret,
    function(error, data, response) {
        if (error) {
            console.log(error);
            // something went wrong
        } else {
            console.log('Tweet sent to ' + handle);
            // data contains the data sent by twitter
        }
    }
  );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
