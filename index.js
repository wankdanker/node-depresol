var doWhile = require('dank-do-while');

module.exports = Depresol;

function Depresol(fn) {
	
	return function DrepresolLookup (dep, cb) {
		var resolved = [];
		var results = [];
		var deps = [dep];
		var error = false;

		doWhile(function (more) {
			var lookup = deps.shift();

			if (!lookup) {
				return more(false);
			}

			fn(lookup, function (err, res, resDeps) {
				if (err) {
					error = error;
					return more(false);
				}

				resolved.push(lookup);
				results.push(res);
				
				if (resDeps && resDeps.length) {
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

