# Hooz birthday web application:
This application has as its core features, currently functioning as expected, to check all birthday registered, see whose birthday is on the current date, edit and delete birthday records, and register users.

From home page click FIND NOW button to see whose birthday it is today.
To see all registered birthdays click SEARCH ALL BIRTHDAYS button. 
To edit or delete any birthday record click buttons on birthday record card. 
You can register a new birthday by clicking ADD NEW button on the page displaying the birthdays.
Also you can register a new user by clicking Sign Up Link on the nav bar.
All links on nav bar and footer will take you to the respective page or 'under development' page.

## Installation:
Use the node package manager npm to install dependencies.

From birthday-app\frontend and birthday-app\backend run

```bash
npm install
```

## Start and run application:
Afters installing all dependencies it's time to start and run the application locally. Open two terminals, cd into birthday-app\frontend and birthday-app\backend and run the following command:

```bash
npm start
```

The .env file on backend directory contains the env variable to be used for database connection. The mongoDB database server is hosted on Atlas cloud cluster. The cluster allow all IP address access to the birthday-app network, therefore the application can be run from any device if you have the access string. Hence, database should be able to connect without any issues.

## Github
[Github project](https://github.com/ana-malim/birthday-app)