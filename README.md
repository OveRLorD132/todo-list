# Todo-List

## Description

This repository contains the code for a web application called "Todo-List". The application allows users to create tasks, mark them as completed, prioritize tasks, add subtasks, and perform other related actions.

This project has: 

+ Authentication and registration. You can create your account and then log in to access most of pages.
+ User profiles. There is a page with your own profile. There is data you entered during registration and some extra fields like telephone and country. You can change all of them except your ID. You can also upload and crop your avatar.
+ Password Change. A simple page to change your password.
+ Main Page. This page contains all the tasks you have added and a form to add more. There is also many features. For example if you click to a task you can see more info about it, you can add subtasks, write your note about it. You can delete, change type, edit, finish every task you added. When you finish or delete a task all its subtasks set to finished or delete. There is also form on the blue line above. You can search for the tasks with it.

## Directory Description 

### module 

This directory contains backend modules.
#### db
It includes classes for working with databases, specifically MySQL and Redis.
#### auth
It contains middleware functions for user authentication and registration. It also exports a LocalStrategy for passport.js and a registration function.
#### middlewares

This folder includes middlewares like passport for setting up local strategy, serialize, and deserialize user.

#### validation

It holds validation functions for validating form data.

#### Other

There is also files like Tasks, Users, Subtasks, those files exports classes to work with MySQL tables and include some redis caching.

Password.js class to work with bcrypt.

User.js class to work with user Profiles.

### rublic 

A directory to serve static files.
Default folders like javascripts, stylesheets, images, fonts.
/images/profile/ Contains user profile images.

### routes 

It defines Express routes for handling different HTTP requests.

### src 

It contains Vue components for each page and global components.
+ Each folder represents a specific page and contains the corresponding Vue component.
+ The "components" folder holds reusable Vue components.
+ The "module" folder contains files that export classes if necessary.

### views 

It contains EJS templates that are rendered by the server.

### app.js

This is the main file of the project that sets up an Express server and imports and sets up routes.

### package.json 

It defines the project's dependencies.

### webpack.config.js 

This is the Webpack configuration file used to bundle Vue components.

## Installation guide 

Please make sure you have Node.js and npm installed on your system. Additionally, the project utilizes Redis and MySQL databases. Follow these steps to install and set up the Todo-List application:
1. Clone repository.
   ```bash
   git clone https://github.com/OveRLorD132/todo-list
2. Go to directory and install dependencies.
   ```bash
   cd todo-list
   npm install
3. Import the database backup into your MySQL database. If you have MySQL Desktop installed, you can skip this step and import the backup using the MySQL Desktop interface. Otherwise, follow these commands:
   ```bash
   cd /path/to/mysql/directory
   mysql -u root -p password todo-list < /path/to/backup/file.sql
   ```
   Replace /path/to/mysql/directory with the path to your MySQL directory, password with your MySQL password, and /path/to/backup/file.sql with the path to the database backup file located in the ./db backup/ directory of the project.
4. Start the Redis server by running redis-server.exe.
5. Run project.
   ```bash
   cd /path/to/repository
   node app.js
6. Open your web browser and go to http://localhost:3000/ to access the Todo-List application.
If you don't want to registrer you can login usin this data: 

   username: overlord

   password: overlord

Ensure that Redis server is running and accessible, and MySQL is properly configured with the imported database.

## Modules used

### Frontend Dependencies:

+ axios: Promise-based HTTP client for making API requests.
+ cropperjs: JavaScript image cropping library.
+ css-loader: Loader for CSS files in Webpack.
+ vue: JavaScript framework for building user interfaces.
+ vue-loader: Loader for Vue components in Webpack.
+ vue-template-compiler: Compiler for Vue template files.
+ webpack: Module bundler for JavaScript and other assets.
+ webpack-cli: Command-line interface for Webpack.
  
### Backend Dependencies:

+ Node.js version 18.15.0.
+ bcrypt: Library for hashing passwords.
+ connect-flash: Flash message middleware for Express.
+ cookie-parser: Middleware for parsing cookies in Express.
+ debug: Small debugging utility.
+ ejs: Templating engine for rendering dynamic HTML templates.
+ express: Fast and minimalist web framework for Node.js.
+ express-session: Middleware for managing sessions in Express.
+ formidable: Form data parsing and file upload library.
+ http-errors: HTTP error utility.
+ ioredis: Redis client library.
+ morgan: HTTP request logger middleware for Express.
+ mysql2: MySQL client library.
+ passport: Authentication middleware for Node.js.
+ passport-local: Passport strategy for local authentication.
+ style-loader: Loader for injecting CSS styles into the DOM during runtime.