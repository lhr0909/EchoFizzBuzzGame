/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * For additional samples, visit the Alexa Skills Kit developer documentation at
 * https://developer.amazon.com/appsandservices/solutions/alexa/alexa-skills-kit/getting-started-guide
 */

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.[unique-value-here]") {
             context.fail("Invalid Application ID");
         }
        */

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                     event.session,
                     function callback(sessionAttributes, speechletResponse) {
                        context.succeed(buildResponse(sessionAttributes, speechletResponse));
                     });
        }  else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                     event.session,
                     function callback(sessionAttributes, speechletResponse) {
                         context.succeed(buildResponse(sessionAttributes, speechletResponse));
                     });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
                + ", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
                + ", sessionId=" + session.sessionId);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
                + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    console.log(intentName);
    console.log(session.attributes);

    // Dispatch to your skill's intent handlers
    if ("StartGameIntent" === intentName) {
        startGame(intent, session, callback);
    } else if ("NumberEnterIntent" === intentName) {
        enterNumber(intent, session, callback);
    } else if ("BuzzIntent" === intentName) {
        buzz(intent, session, callback);
    } else if ("HelpIntent" === intentName) {
        getRules(callback);
    } else {
        throw "Invalid intent " + intentName;
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
                + ", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Welcome";
    var speechOutput = "Welcome to FizzBuzz, a wonderful game that is suitable for all ages!"
                + "To start a game, say start a game from number one. "
                + "To listen to the rules, say help, or how do I play this game?";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "Having trouble starting a game? Say start a game from number one";
    var shouldEndSession = false;

    callback(sessionAttributes,
             buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getRules(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Rules";
    var speechOutput = createRuleText("");
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "Having trouble starting a game? Just say start a game from number one";
    var shouldEndSession = false;

    callback(sessionAttributes,
             buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

/**
 * Sets the color in the session and prepares the speech to reply to the user.
 */
function startGame(intent, session, callback) {
    var cardTitle = intent.name;
    var startNumberSlot = intent.slots.StartNumber;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";

    if (startNumberSlot) {
        var startNumber = startNumberSlot.value;
        sessionAttributes = createNextNumberAttributes(parseInt(startNumber));
        speechOutput = "Let the games begin. Next number is " + startNumber;   // createRuleText(startNumber);
        repromptText = createRepromptForRule(startNumber);
    } else {
        //TODO: fix this
        speechOutput = "I'm not sure what your favorite color is, please try again";
        repromptText = "I'm not sure what your favorite color is, you can tell me your "
                + "favorite color by saying, my favorite color is red";
    }

    callback(sessionAttributes,
             buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function createRepromptForRule(startNumber) {
    return "Taking too long to start the game? Give that person a penalty and try to start the game again by saying the starting number " + startNumber;
}

function createRuleText(startNumber) {
    return "Okay, so here are the rules for fizz buzz. Everyone should stand or sit in a circle surrounding me, "
           + "and pick a person to start by saying the starting number " + startNumber
           + ". Then the next person says the next number " + (parseInt(startNumber) + 1)
           + ", and so on. But if the number is a multiple of 7, such as 14 and 21, or contains 7, such as 27 and 47, you have to say the word buzz. "
           + "Choose your favorite form of penalty for the person who misses the game rules! "
           + "Everyone ready to play the game yet?";
}

function createNextNumberAttributes(nextNumber) {
    var checkForBuzz = function(n) {
        if (n % 7 === 0) {
            return true;
        }
        //if contains 7
        if (n.toString().indexOf("7") > -1) {
            return true;
        }
        return false;
    };
    return {
        nextNumber: parseInt(nextNumber),
        isBuzz: checkForBuzz(parseInt(nextNumber))
    };
}

function buzz(intent, session, callback) {
    var cardTitle = intent.name;
    var nextNumber;
    var isBuzz;
    var repromptText = "Taking too long to figure out? Take a penalty and restart the game! Thanks for playing.";
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";

    if(session.attributes) {
        nextNumber = session.attributes.nextNumber;
        isBuzz = session.attributes.isBuzz;

        console.log("nextNumber=" + nextNumber);
        console.log("isBuzz=" + isBuzz);

        if (isBuzz) {
            //keep going
            speechOutput = "Nice one!"
            sessionAttributes = createNextNumberAttributes(nextNumber + 1);
            shouldEndSession = false;
        } else {
            //uh oh
            speechOutput = "Uh oh, you should have said " + nextNumber + " instead! Time for a penalty!";
        }

    } else {
        //nothing in session attributes, doesn't seem to happen often right?
        speechOutput = "Something isn't quite right. Let's restart";
    }

    // Setting repromptText to null signifies that we do not want to reprompt the user.
    // If the user does not respond or says something that is not understood, the session
    // will end.
    callback(sessionAttributes,
             buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function enterNumber(intent, session, callback) {
    var cardTitle = intent.name;
    var nextNumberInSession;
    var isBuzz;
    var nextNumberSlot = intent.slots.NextNumber;
    var repromptText = "Taking too long to figure out? Take a penalty and restart the game! Thanks for playing.";
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";

    if(session.attributes) {
        nextNumberInSession = session.attributes.nextNumber;
        isBuzz = session.attributes.isBuzz;

        console.log("nextNumberInSession=" + nextNumberInSession);
        console.log("isBuzz=" + isBuzz);
    }

    if (nextNumberSlot) {
        var nextNumber = nextNumberSlot.value;

        console.log("nextNumber=" + nextNumber);

        if(nextNumberInSession) {
            if (isBuzz) {
                //should be buzz, take a shot
                speechOutput = "Ahh, you should say buzz instead! Penalty time!";
            } else {
                if (parseInt(nextNumberInSession) !== parseInt(nextNumber)) {
                    //wrong number
                    speechOutput = "Ahh, it should be " + nextNumberInSession + "! This person needs to take a penalty!";
                } else {
                    //keep going
                    speechOutput = "Go on."
                    sessionAttributes = createNextNumberAttributes(parseInt(nextNumberInSession) + 1);
                    shouldEndSession = false;
                }
            }
        }
        else {
            //no next number in session attributes, doesn't seem to happen often right?
            speechOutput = "Something isn't quite right. Let's restart";
        }
    } else {
        //something is also wrong here because there is no nextNumberSlot
        speechOutput = "Not sure what's going on. Let's try again by restarting the game.";
    }

    // Setting repromptText to null signifies that we do not want to reprompt the user.
    // If the user does not respond or says something that is not understood, the session
    // will end.
    callback(sessionAttributes,
             buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: "FizzBuzz - " + title,
            content: "FizzBuzz - " + output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    }
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }
}
