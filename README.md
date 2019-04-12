# Babychatbot

A chatbot who can play mathematics games, tell jokes and say things you told her to say.

## Requirements

### Requirement 1: You should build a chat user interface
The user interface can only have one user and one bot
There is a place to type your message, just like a chat app
The chat message is shows sequentially on the screen, just like a chat app

### Requirement 2: Play Mathematic Game
User should be able to type “Play math game”, and the bot you give the user a random mathematical question
User should be able to type the answer, and the bot should reply

### Requirement 3: Tell Me a Joke:
User should be able to type “Tell me a joke”
The bot should fetch a joke from http://api.icndb.com/jokes/random
The API documentation is here: http://www.icndb.com/api/

## How to run the chatbot

1. Clone locally: `git clone https://github.com/jiangxiaoxuan/babychatbot.git`
2. Install dependencies: `npm install`
3. Start the app: `ng serve --open` 

## Some highlight features

1. If you type "Hello", the bot will reply you "Hello World"
2. If you type "Say XXXXXX", the bot will confirm with you again whether you truly want it to say it. If you confirm, the bot will continue saying "XXXXXX"; if you type anything else, the bot will say "Ok, good bye."
3. Start mathematics game by typing keyword "Math"
4. Start joke function by typing "Tell me a joke"

## Features to be implemented

1. More math questions
2. A bot that has reminder assistant function
3. Differentiate the colour of text box for bot and user

## Chatbot Preview

Welcome page screenshot:

<img src="https://github.com/jiangxiaoxuan/babychatbot/raw/master/screenshots/welcome-page.png" />

Chat screenshot:

<img src="https://github.com/jiangxiaoxuan/babychatbot/raw/master/screenshots/chat-preview.png" />

## Chatbot Design

The agent design has tapped on the object oriented design concept and thus provide extensibility to the chatbot for future additional functionalities.

<img src="https://github.com/jiangxiaoxuan/babychatbot/raw/master/screenshots/agent-design.jpg" />

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
