

'use strict';
const Alexa = require('alexa-sdk');


const APP_ID = undefined;

// const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const STOP_MESSAGE = 'Goodbye!';
const data = [];

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask',"Hi, How can I be of help?");
    },
    'assignTask': function () {
        var task = this.event.request.intent.slots.task.value;
        var user = this.event.request.intent.slots.user.value;
        if(data.find(function(obj){ return obj.name === user } )){
            var index = data.findIndex(function(obj){ return obj.name === user } );
            data[index].task.push(task);
        }
        else{
            var obj = { name : user , task : [task] };
            data.push(obj);
        }
        //when the user is there
        
        var text = 'assigning ' + task + ' to ' + user;
        this.emit(':tell',text);
    },
    'getStats': function () {
        var text = '';
        if(data.length == 0){
            text = 'Sorry, there are no tasks assigned to any user';
        }
        else{
            data.forEach(function(d){
               text += d.name + ' has ' + d.task.length + ' task, '; 
            });
        }
        this.emit(':tell',`${text}`);
    },
    'getUserTask': function () {
        var text = '';
        var user = this.event.request.intent.slots.user.value;
        if(data.find(function(obj){ return obj.name === user } )){
            var index = data.findIndex(function(obj){ return obj.name === user } );
            text += data[index].name + ' has following tasks :  '; 
            data[index].task.forEach(function(d){
               text += d + ' , '; 
            });
        }
        else{
            text = "Sorry I couldn't find any user with that name, Can you please tyr again?";
        }
        
        this.emit(':tell',`${text}`);
    },
    'Greeting' : function(){
      this.emit(':tell',"I can help you get your tasks ready and also help you delegate your work.")  
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
