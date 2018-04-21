

'use strict';
const Alexa = require('alexa-sdk');


// const APP_ID = undefined;

// const SKILL_NAME = 'Space Facts';
// const GET_FACT_MESSAGE = "Here's your fact: ";
// const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
// const HELP_REPROMPT = 'What can I help you with?';
// const STOP_MESSAGE = 'Goodbye!';


const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask',"Hi, How can I be of help?");
    },
    'Greeting' : function(){
      this.emit(':tell',"I can help you get your tasks ready and also help you delegate your work.")  
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
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
