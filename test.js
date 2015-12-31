var test = require('tape');
var depresol = require('./');

var data = {
	'a' : {
		name : 'a'
		, deps : ['b', 'd']
	}
	, 'b' : {
		name : 'b'
		, deps : ['c', 'd']
	}
	, 'c' : { name : 'c' }
	, 'd' : {
		name : 'd'
		, deps : ['e']
	}
	, 'e' : { name : 'e' }
}

var d = depresol(function (lookup, cb) {
	return cb(null, data[lookup], data[lookup].deps);
});

test('basic usage', function (t) {
	d('a', function (err, results) {
		t.deepEqual(results, [data.a, data.b, data.d, data.c, data.e]);
		t.end();
	});
});
