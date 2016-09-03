This is [TaskQ.io](https://taskq.io) SDK for Node.js.

# Installation

To install the SDK in your project, use:

```
npm install taskq --save
```

# Usage

## Queueing tasks

```javascript
var TaskQ = require('taskq.io')

// Optional - TaskQ will default to process.env.TASKQ_API_KEY as set by Heroku 
TaskQ.setApiKey('1o2TzlloDCZK8PioXjocb5xm1A8GU5ItVR9u0ND682cKjy1GBH')

var params = {
	user_id: 'L1mxeDbCIdv7COIUjuJ9'
}

TaskQ.queue('/dev/null', params, function (error) {
	if (error) {
		console.log('Error: ', error)
		return
	}
	console.log('Success!')
})

```

