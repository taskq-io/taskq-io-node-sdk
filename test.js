var TaskQ = require('./index'),
	assert = require('assert')

TaskQ.setApiKey('lows6ysX7D482sAb87p0j5oYsvdFBroDtSOlN5tEbaL1Dv7X4gz0G25B0XG7Xcrh')

describe('TaskQ', function () {

	describe('queue()', function () {

		it('should queue a task', function (done) {
			var params = {
				int_param: 123456,
				float_param: 123456.89,
				string_param: 'works as well'
			}
			TaskQ.queue('/tasks/unit-test', params, function (error) {
				if (error) {
					assert.fail(error)
				} else {
					done()
				}
			})
		})

	})
})
