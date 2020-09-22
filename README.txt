TUTORIAL LINK:
----------------------------------------------------------------------
https://medium.com/@bretcameron/mongodb-a-beginners-guide-8fca0c7787a4

HOW TO RUN:
----------------------------------------------------------------------
1. At the root directory, run the following command:
  nodemon server

  1a. this runs a server that continuously updates every time I save
  1b. if you just want to test the server quickly, run this instead:
    node server

2. Open up a new window @ http://localhost:5000/

3. If using Postman, use http://localhost:5000/ as the request URL and make sure to change the method to either:
  - POST
  - DELETE
  - UPDATE
  depending on what you're trying to do. Make sure to comment out the other code.


FILES & MODULES(directories):
----------------------------------------------------------------------
server.js
- main file containing all database operations and handling of API calls

config:
- used to store our URI for security
- we can then avoid storing sensitive data in a git repo
- we can inject the URI during deployment so it stays a secret
- If planning on committing this project, put the config folder inside your .gitignore file

config -> default.json:
- actual file used to store our URI for security

models:
- store files that define objects with a strongly-typed Schema

models -> Animal.js:
- file containing our AnimalSchema
