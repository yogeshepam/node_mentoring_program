# node_mentoring_program
This repository is for the homework or task assigned under EPAM Node.js global mentoring program.

Dependencies:
1. Install DB PostgreSQL on your machine.
2. Optional: `npm install -g sequelize-cli` 
(In case you dont', you'll need to prefix every call to the sequelize command with 
./node_modules/.bin.)
3. Run pgAdmin to check DB and tables.

2. Run DB server

Steps to setup:

1. Clone repo.
2. Run `npm install` from the root folder.
3. Run `npm run createdb` in `powershell` to create `node_mentoring` DB on your machine. 
   If asked for a password enter password for postgres or change the user in script.
    
    3.1 createdb: command not found: it means PostgreSQL is not rightly installed. You can
        run `createdb node_mentoring` from absolute path: `C:\Program Files\PostgreSQL\12\bin`.
        
    3.2 Try adding to system envio var 
        `C:\Program Files\PostgreSQL\12\bin`
        `C:\Program Files\PostgreSQL\12\lib`
        
    3.2 If still there is problem running the script, Add DB to your machine manually.
4. Run `npm run migratedb`, to use schemas to create the table Users.
5. Run `npm run seeddb`, to use schemas to populate the table with seed users.
6. Run `npm start`.
7. There should be a message on console
    
    Express loaded, 
    
    DB loaded,
    
    Application running on port 4000.
8. You can check in chrome on route `http://localhost:4000/api/`, if response is:
    
    `{"ok":true}`

9. POST, PUT, DELETE APIs can be tested in postman.

10. Scripts for testing:

    `test` - Runs units tests added to project.
    
    `coverage` - Adds coverage report for project in `coverage/lcov-report/api/controller/index.html`. (100% for both controllers)
    
    `pretest` - npm script that is automatically invoked when the npm test command is invoked. Command changes the environment to test and refresh the database before each test runs.
    
    `migrate:reset`: This command will be responsible for refreshing the database before each test runs.

Import `node_mentoring.postman_collection.json` in postman to try apis for users and groups. Else,

Sample valid JSON to create a user:

`{
	"age": "42",
	"isDeleted": false,
	"login": "test@test.com",
	"password": "A1"
}`

To consume any API, you need to login first using:

http://localhost:4000/api/auth/signin

In case postman test script doesn't work,
Copy token from response and save it as a value of ACCESS_TOKEN variable in project envio variables.

401 - Unauthorized error, if authorization header doesn't contains token. 
403 - Forbidden error, in case provided token is not valid.

User routes:

http://localhost:4000/api/

POST:   `users/`

GET:    `users/:id`

GET:     `users`

GET:     `users?loginSubstring=@go&&limit=2`

PUT:     `users/updatebyid`

PUT:     `users/delete` (soft delete)

DELETE:  `users/delete/:id` (hard delete)

Group routes:

http://localhost:4000/api/

POST:   `groups/`

GET:    `groups/:id`

GET:     `groups`

PATCH:   `groups/updatebyid`

PUT:     `groups/delete` (soft delete)

DELETE:  `groups/delete/:id` (hard delete)

Add users to group route:

PATCH:  `groups/:groupId/addUsers` 

Get list of users:

GET: `groups/:groupId/getUsers`

In case you delete user or group from DB, linked records get deleted from UserGroup also.

How to add new entity model and migrations?

`sequelize model:generate --name Group --attributes name:string,permissions:array:{string}`
`sequelize model:create --name UserGroup --attributes userId:integer,groupId:integer`

How to create seeder files?
`sequelize seed:create --name Group`

How to tests CORS?
Comment out CORS middleware and run testCors.html file, 
in dev console, you will see CORS error, uncomment the CORS middleware and run again.

Information on DB connection can be found in .env file and is consumed in project in `config,postgres.js`

Try route `http://localhost:7000/test-cors` in postman and see if you get a token from port 7000.

References:

Timing Attacks [https://blog.sqreen.com/developer-security-best-practices-protecting-against-timing-attacks/]
