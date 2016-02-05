var doWhile = require('dank-do-while');

module.exports = Depresol;

function Depresol(fn) {
	return function DrepresolLookup (dep, cache, cb) {
		var resolved = [];
		var results = [];
		var deps = [dep];
		var error = false;

		if (typeof cache === 'function') {
			cb = cache;
			cache = {};
		}

		doWhile(function (more) {
			var lookup = deps.shift();

			if (!lookup) {
				return more(false);
			}

			fn(lookup, cache, function (err, res, resDeps) {
				if (err) {
					error = error;
					return more(false);
				}

				resolved.push(lookup);
				results.push(res);
				
				if (resDeps && resDeps.length) {
					if (!Array.isArray(resDeps)) {
						resDeps = [resDeps];
					}
					//loop through each of the resDeps and 
					//eliminate them if they have already been
					//resolved or is pending to be resolved.

					resDeps.forEach(function (dep, ix) {
						if (~resolved.indexOf(dep)) {
							resDeps[ix] = null;
						}
						else if (~deps.indexOf(dep)) {
							resDeps[ix] = null;
						}

					});

					resDeps = resDeps.filter(Boolean);

					deps = deps.concat(resDeps);
				}

				return more(true);
			});
		}, function done (){
			cb(null, results);
		});
	}
}

