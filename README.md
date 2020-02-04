# node_mentoring_program
This repository is for the homework or task assigned under EPAM Node.js global mentoring program.

Steps to setup:

1. Clone repo.
2. Run `npm install` from the root folder.
3. Run `npm start`.
4. There should be a message on console
    
    Express loaded, 
    
    DB loaded,
    
    Application running on port 4000.
5. You can check in chrome on route `http://localhost:4000/api/`, if response is:
    
    `{"ok":true}`

6. POST, PUT, DELETE APIs can be tested in postman.

Sample valid JSON to create a user:

`{
	"age": "42",
	"id": 1,
	"isDeleted": false,
	"login": "test@test.com",
	"password": "A1"
}`

Routes:

http://localhost:4000/api/

POST:   `users/`

GET:    `users/user/:id`

GET:     `users`

GET:     `users?loginSubstring=@go&&limit=2`

PUT:     `users/updatebyid`

PUT:     `users/delete` (soft delete)

DELETE:  `users/delete/:id` (hard delete)
