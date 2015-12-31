depresol
--------

An asynchronous dependency resolver.

This is probably not the most robust or correct dependency resolver, but it suits my use-case.

example
-------

```js
var depresol = require('depresol');

var d = depresol(function (lookup, cb) {
	/* do stuff to find an object based on `lookup` and get its list of dependencies */

	redis.get(lookup, function (err, data) {
		data = JSON.parse(data);

		//here `data` is an imaginary object which contains
		//a `deps` property that is an array of dependency lookup keys
		return cb(err, data, data.deps);
	});
});

d('a', function (err, result) {
	//result contains an array of all the dependencies
});
```

license
-------

MIT
