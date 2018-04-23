

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
    'reset': function () {
        data.splice(0,data.length);
        this.emit(':ask',"Let's start off fresh!");
    },
    'didFinish': function () {
        var task = this.event.request.intent.slots.task.value;
        var user = this.event.request.intent.slots.user.value;
        var text = '';
        if(data.find(function(obj){ return obj.name === user } )){
            var index = data.findIndex(function(obj){ return obj.name === user } );
            if(data[index].task.find(function(obj){ return (obj === task); } )){
              
              text = `No, ${user} has not finished ${task}`;
            }
            else{
                text = `Yes, ${user} has finished ${task}`;
            }
        }
        else{
            text = "Sorry I couldn't find any user with that name, Can you please try again?";
        }
        this.emit(':ask',text);
    },
    'userStats': function () {
        var text = '';
        var user = this.event.request.intent.slots.user.value;
        if(data.find(function(obj){ return obj.name === user } )){
            var index = data.findIndex(function(obj){ return obj.name === user } );
            text = `${user} has completed ${data[index].taskFinished} tasks out of ${data[index].taskCount} tasks.`;
            
        }
        else{
            text = "Sorry I couldn't find any user with that name, Can you please try again?";
        }
        
        this.emit(':tell',`${text}`);
    },
    'assignTask': function () {
        var task = this.event.request.intent.slots.task.value;
        var user = this.event.request.intent.slots.user.value;
        if(data.find(function(obj){ return obj.name === user } )){
            var index = data.findIndex(function(obj){ return obj.name === user } );
            data[index].task.push(task);
            data[index].taskCount += 1;
        }
        else{
            var obj = { name : user , task : [task] , finishedTask : [] , taskCount : 1, taskFinished :0 };
            data.push(obj);
        }
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
            if(data[index].task.length>0){
                text += data[index].name + ' has following tasks :  '; 
                data[index].task.forEach(function(d){
                text += d + ' , '; 
                });
            }
            else{
                text =`${user} has no pending tasks.`
            }
            
        }
        else{
            text = "Sorry I couldn't find any user with that name, Can you please try again?";
        }
        
        this.emit(':tell',`${text}`);
    },
    'menu' : function(){
      this.emit(':tell',"I can help you delegate your work and keep a track of that.")
    },
    'getTaskUser' : function(){
      var task = this.event.request.intent.slots.task.value;
        var text =`The task has been assigned to `;
        data.forEach(function(da){
            if(da.task.find(function(obj){ return(obj===task); })){
            text += da.name + " ";
            }
        });
      this.emit(':tell',text);   
    },
    'finishOneWork' : function(){
        var task = this.event.request.intent.slots.task.value;
        var user = this.event.request.intent.slots.user.value;
        var text ='';
        
        if(data.find(function(obj){ return obj.name === user } )){
            var index = data.findIndex(function(obj){ return obj.name === user; } );
            if(data[index].task.find(function(obj){ return (obj === task); } )){
              var indexar = data[index].task.findIndex(function(obj){ return (obj === task); } );
              data[index].task.splice(indexar,1);
              data[index].taskFinished++;
              text = "The task has been marked completed";
            }
        }
        else{
            text = "Sorry I couldn't find any user with that name, Can you please try again?";
        }
        
      this.emit(':tell',text);   
    },
    'finishAllWork' : function(){
        var user = this.event.request.intent.slots.user.value;
        var text ='';
        
        if(data.find(function(obj){ return obj.name === user } )){
            var index = data.findIndex(function(obj){ return obj.name === user; } );
            data[index].task.splice(0,data[index].task.length);
            data[index].taskFinished = data[index].taskCount;
            text = `All the tasks of ${user} has been marked completed.`;
        }
        else{
            text = "Sorry I couldn't find any user with that name, Can you please try again?";
        }
        
      this.emit(':tell',text);   
=======
>>>>>>> a8ed86b9c9f6d8269e9f8f93c79a821d21b4078f
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
