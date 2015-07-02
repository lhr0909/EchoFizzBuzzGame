# First Feedback

Dear Developer,

Thanks for submitting your skill for certification. Please find the below feedback from our certification team.

### Functional Feedback:
1. Skill does not handle "undefined" values for number to start at. EX "Alexa, Tell fizzbuzz to start a game from" will respond with "starting game at undefined". The skill should respond with that is an invalid number or I did not catch the number to start with please try again.

### SAMPLE DATA QUALITY
* BuzzIntent contains several sample utterances that replace "buzz" with "bus". While I understand why these were included, the inclusion of homophones (or near homophones) is actually counterproductive to the ASR process. You should remove these utterances.

### SAMPLE DATA QUANTITY
* In general, try to add a greater number of sample phrases for all intents. For example, the skill currently specifies only 4 samples in the StartGame intent and this kind of skill will typically have input variations from users that would require many more samples for a high quality experience. In addition to thinking of more yourself, ask friends and family how they would say different things and add those to the training data. For example, in the StartGame intent users could potentially attempt to start by using different verbs, like "begin" or "kick off". Try to expand each intent as much as possible.

* You will also want to include many more numbers in your examples for the NUMBER slot types. This will help to achieve better accuracy when you get a larger variety of responses from users.

* You will also want to add sample phrases that can naturally follow the launch phrases in a single utterance, for example:

        a. noun phrases - things that can follow "ask <skill> for ..." or "tell <skill> about..."
            e.g. "[ask fizz buzz for] a new game"
        b. questions, in both interrogative and inverted forms - things that can follow "ask <skill> ..."
            e.g. "[ask fizz buzz] what commands i can ask" as well as "[ask fizz buzz] what commands can i ask"
        c. commands - things that can follow "tell <skill> to..." or "ask <skill> to..."
            e.g. "[ask fizz buzz to] begin a game from seven"

### User Experience Issues:
Nice work on creating your first Echo skill! There are a few key things that you can do to help clarify for the user.  Below are some key questions we ask when evaluating the CX of your skill and how your skill faired.

* Q:  Is the invocation phrase short, sweet, and intuitive?
    * a. Yes, nicely done.
* Q:  Is it easy and natural to invoke the skill in one utterance using the "Ask [Fizz buzz] to [do something]?
    * a. No.  I can't reliably invoke the still in one utterance.  This may be because you don't have enough training data.
* Q:  Does the skill respond to a one shot invocation (Ask fizz buzz for ."  in a way that is contextualized, but also short and sweet?
    * a. Yes, but it was confusing and probably a bug.  It said "let the games begin.  Next number is undefined."
* Q: If you open the skill without an intent (alexa, open fizz buzz), are you prompted for a supported response?
    * a. Yes. It's a little lengthy.  I don't think you need two examples for how to get the rules.  You can cut off the last part and just say, "To get the rules, say help."
* Q: Does the stream close after the task is complete?  If not, does it prompt the user for a supported response?
    * a. No.  I'm honestly confused about how to play this game with Alexa.  She doesn't seem to hear the numbers, and it often triggers an error prompt that is something "taking too long to start the game?..." She doesn't respond when someone messes up, either.  I'm unsure of what Alexa's role is in this game.  She seems to neither be a monitor, nor a participant, and when she does speak up, it's not with a helpful response.
* Q.  Are you able to ask for help to get more info?
    * a.  Yes.
* Q:  Is it easy to exit the skill?
    * a. No.  You need to build in exit handling.  Be sure include things like, "Stop"  "Exit" "Cancel" "End game." Etc.
* Q:  Does the skill gracefully handle unexpected responses (both invalid, or partial info)?
    * a. No.  You should add in more phrasing to allow for more responses.  Right now the valid phrasing is very strict and does not allow for variations or natural phrasing.  Also, be sure to include adequate error handling for these circumstances.   [Refer to the best practices here for error handling guidance](https://developer.amazon.com/appsandservices/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-voice-design-best-practices#Handling Dialogue Errors).
* Q:  Are the system responses easy to understand?
    * a. No. There is a typo in the Rules where it says "the next person says the next number NaN.." which makes it hard to follow because you are trying to figure out what that was while she continues to read on.  Also, the readback of the directions is fairly lengthy and hard to follow.  Ask friends and family to listen to it and ask them if it's clear.  Also, have friends and family try to play the game to see the types of errors I'm coming up against.  For example, at the end of help you say "Everyone ready to play the game yet?" and I say "yes" and it doesn't understand me.  This can probably be solved by more training data, but you should be prepared for typical user responses.

### Sample phrases to display on the skill's page:
Requirement: Make sure to include the wake word "Alexa" at the beginning. Add a period at the end of the phrase. We recommend capitalizing the name of your skill in the phrase. Examples:

    . Alexa, ask FizzBuzz to start a game from number 1.
    . Alexa, ask FizzBuzz to start a game from 25.
    . Alexa, ask FizzBuzz to play a game starting from 11.

### Feedback on skill description:
Requirement: Ideally, this description will very briefly summarize what FizzBuzz is. Many people may not know what it is or how it's played. Right now, it's unclear what the skill does. It's also unclear how to play it using Alexa. How does Alexa interact with the people playing the game? The goal is to help users understand why they should use the skill, how to use it, and what the scope of the skill is. At least start with:

    FizzBuzz is a fun word game for learning about division.
    If you only want users who already KNOW how to play FizzBuzz, then say that in the description:
    If you love the fun word game FizzBuzz, now you can play it with your Echo [or something like that].

### Feedback on Home page card heading and titles:
Feedback: Good job on making sure that the headings already use the skill name "FizzBuzz". However, there's still some content on the cards that isn't customer-friendly.
Below is an example of a current response card. In this particular example, you need to replace "StartGameIntent" with something customer-friendly.

    FizzBuzz - StartGameIntent
    FizzBuzz
    FizzBuzz - Let the games begin. Next number is 1

Regards,
The Alexa Skills Team