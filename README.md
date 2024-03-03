<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Prerequisites

Before running the project locally, ensure you have the following installed:
•	Node.js and npm
•	MongoDB


## Step-by-Step Instructions
## 1.	Clone the Repository
git clone https://github.com/Maham814/project.git
 
## 2.	Install Dependencies
```bash
$ cd your-repo
```
```bash
$ npm install 
```

## 3.	Set Environment Variables
Create a .env file in the root directory of the project and set the following environment variables:
env
DB TYPE=mongodb
DB HOST=localhost
DB PORT=27017
DB_NAME=task-manager
DB_CONNECTION=mongodb://localhost:270
DB SYNCHRONIZE=true
DB LOGGING=true
JWT SECRET=kwansoCodeChallenge
JWT EXPIRES=1d


## 4.	Seed the Database
The seeder file will run automatically when starting the application:
```bash
$ npm run start
```
   
## 5.	Start the Server
```bash
$ npm run start
```
The server will start running locally on port 3000 by default.

## Swagger Documentation
Swagger documentation can be accessed at:
http://localhost:3000/api
This provides an interactive API documentation interface for exploring and testing the endpoints of the application.

## Endpoints Tested
All endpoints have been thoroughly tested and are working as expected.
Note: For any issues or assistance, please contact imaham814@gmail.com.

## Structure and Modules
This project is structured into two main modules:
1.Auth Module: Handles user authentication, including registration, login, and authorization.
•	Contains controllers, services, and DTOs related to authentication.
•	Utilizes middleware for authentication and authorization checks.

Here are the steps for the user sign-up and verification process:
=> User Sign-Up
•	User enters their email and clicks on the sign-up button.
•	Admin generates a random password for the user.
•	Admin creates a token for the user based on their email and the generated password.
•	Admin sends the token to the user.

=> Verify Token Endpoint
•	Endpoint checks if the token is valid and not expired.
•	If the token is valid, the user's status is set to isVerified: true.

=> Token Login Endpoint
•	User clicks on the token login button.
•	Endpoint checks if the token is valid.
•	If the token is valid, the user is allowed to login into the system.


2.	Tasks Module: Manages tasks, including CRUD operations and task-related functionalities.
•	Consists of controllers, services, and DTOs related to tasks management.



## Design Patterns
Implemented Design Patterns
1.	Dependency Injection (DI):
•	Nest.js heavily utilizes dependency injection to manage the creation and resolution of application components. This promotes modularity, testability, and extensibility by decoupling the components from their dependencies.

2.	Modules:
•	Nest.js applications are organized into modules, which encapsulate related functionality. This promotes separation of concerns and modularity, making the codebase more maintainable and scalable.

3.	Middleware:
•	Middleware functions are used to intercept and modify incoming HTTP requests before they reach the route handler. This pattern is commonly used for implementing cross-cutting concerns such as authentication, logging, and error handling.


## Developer Notes
•	Design Patterns Usage:
•	The project leverages Nest.js design patterns such as dependency injection, modules, and middleware to ensure a well-structured and maintainable codebase.

•	Modular Approach:
•	The use of modules facilitates the organization of code into cohesive units, enabling better separation of concerns and promoting code reuse.

•	Scalability and Extensibility:
•	By following design patterns recommended by Nest.js, the application is designed to be scalable and extensible, allowing for easy addition of new features and functionalities in the future.

