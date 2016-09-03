This is [TaskQ.io](https://taskq.io) SDK for Node.js.

# Installation

To install the SDK in your project, use:

```
npm install taskq.io --save
```

# Usage

## Queueing tasks

```javascript
var TaskQ = require('taskq.io')

// Optional - TaskQ will default to process.env.TASKQ_API_KEY as set by Heroku 
TaskQ.setApiKey('1o2TzlloDCZK8PioXjocb5xm1A8GU5ItVR9u0ND682cKjy1GBH')

TaskQ.queue('/tasks/sync_user', {user_id: 'L1mxeDbCIdv7COIUjuJ9'}, function (error) {
	if (error) {
		console.log('Error: ', error)
		return
	}
	console.log('Success!')
})

```

## Running tasks

The example above will make TaskQ execute `POST` request to `https://yourapp.herokuapp.com/tasks/sync_user` with JSON payload:

```json
{
	"user_id": "L1mxeDbCIdv7COIUjuJ9"
}
```

**Always** remember to check `Authorization` header; otherwise somebody else than TaskQ might be sending reqests to you! 
The SDK provides convenience method to do that:

```javascript
try {
	TaskQ.verify(authorizationHeader)
} catch(e) {
	console.error(e)
}
```

Example using [Express](https://expressjs.com/):

```javascript
var express = require('express'),
	bodyParser = require('body-parser'),
	TaskQ = require('taskq.io'),
	app = express(),
	jsonParser = bodyParser.json()

app.post('/tasks/sync_user', jsonParser, function (rq, rs) {
	try {
		TaskQ.verify(rq.headers['authorization'])
	} catch(e) {
		rs.sendStatus(401)
		return
	}
	try {
		var userId = rq.body.user_id
		...
		rs.sendStatus(200)
	} catch(e) {
		console.error(e)
		rs.sendStatus(500)		
	}
})
```