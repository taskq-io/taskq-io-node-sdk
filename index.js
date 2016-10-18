var https = require('https'),
	package = require('./package.json'),
	apiKey = process.env.TASKQ_API_KEY,
	authorizationHeader = 'Bearer ' + process.env.TASKQ_API_KEY,
	options = getHttpsOptions(process.env.TASKQ_API_KEY)

module.exports = {
	setApiKey: setApiKey,
	verify: verify,
	queue: queue
}

function setApiKey(newApiKey) {
	apiKey = newApiKey
	authorizationHeader = 'Bearer ' + newApiKey
	options = getHttpsOptions(newApiKey)
}

function verify(authorization) {
	if (authorization !== authorizationHeader) {
		throw new Error('TaskQ.io: Invalid authorization header!')
	}
}

function queue(url, params, callback) {
	var body = buildBody(url, params)
	var data = ''
	var request = https.request(options, function (response) {
		if (response.statusCode >= 200 && response.statusCode <= 299) {
			callback()
			return
		}
		if (response.statusCode >= 400) {
			response.on('data', function (chunk) {
				data += chunk
			})
			response.on('end', function () {
				var result = data
				try {
					result = JSON.parse(data)
				} catch (e) {
				}
				callback(result)
			})
			return
		}
		callback(response.statusCode)
	})
	request.on('error', function (e) {
		callback(e)
	})
	request.write(body)
	request.end()
}

function buildBody(url, params) {
	var json = {}
	if (typeof params === 'object' && params !== null) {
		json = JSON.parse(JSON.stringify(params))
	}
	json.url = url
	return JSON.stringify(json)
}

function getHttpsOptions(apiKey) {
	return {
		hostname: 'taskq.io',
		port: 443,
		path: '/api/v1/tasks',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'Node SDK ' + package.version,
			'Authorization': 'Bearer ' + apiKey
		}
	};
}