# How to install all the dependencies of the application:

1. Move to frontend folder and do `npm install`
2. Move to server folder and do `npm install`

## Before running our application server we need to run the MongoDB local server which is run on Mac OS using the command:

To install mongoDB in mac os:

`brew install mongodb-community@6.0`

To run the services:

`brew services start mongodb-community@6.0`

To stop the mongo db services you can use:

`brew services stop mongodb-community@6.0`

## Steps to setup mongo db localhost

1. Open MongoDB Compass
2. Go to your local server of mongo db which you started using the above brew command
3. create a new database named : myDatabase
4. import the collection files provided in the db folder under server folder

## Steps to run the application:

1. First we need to run the sever of the application which is run by node js using Express as the server framework. To do that move to server folder and use the command:

`node server.mjs`

2. Now we need to go to the frontend folder and run the applicatin using the command:

`npm start`

## Steps to test the application

1. You can click on Assignment 3 button to go to homepage at any point.
2. You can click on Players to get the list of players
3. You can click on Teams to get the list of teams
4. If you click on Teams tab, you would see that no player is currently assigned and the points of each team is zero/null
5. Click Assign Teams button to assign the teams
6. Page would reload and display the updated teams assignment
7. The score of the teams is also displayed

# Reference:

1. For learning MERN stack: https://www.mongodb.com/languages/mern-stack-tutorial
