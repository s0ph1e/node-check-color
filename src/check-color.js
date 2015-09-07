var parse = require('parse-color');
var _ = require('lodash');
var defaultShades = require('./default-shades');

function getShade (shades, color) {
	var colorObj = parse(color);
	return _.findKey(shades, function(rules, colorName) {
		var found = _.find(rules, function(rule) {
			var min = rule.h[0];
			var max = rule.h[1];
			var curr = colorObj.hsl[0];
			if (min <= curr && curr <= max) {
				return rule;
			}
		});
		if (found) {
			return colorName;
		}
	});
}

function isShade (shades, checkingShade, color) {
	var actualShade = getShade(shades, color);
	var exactlyEquals = (actualShade === checkingShade);
	var partiallyEquals = _.contains(actualShade.split('-'), checkingShade);
	return exactlyEquals || partiallyEquals;
}

function buildColorChecker() {
	var publicInterface = {};
	var shades = {};

	function init (newShades) {
		var shadeName, methodName;

		publicInterface = {};
		shades = _.clone(newShades || defaultShades);

		for (shadeName in shades) {
			methodName = _.camelCase('is-' + shadeName);
			publicInterface[methodName] = isShade.bind(null, shades, shadeName);
		}

		_.extend(publicInterface, {
			init: init,
			getShade: getShade.bind(null, shades)
		});
	}

	init(defaultShades);
	return publicInterface;
}

module.exports = buildColorChecker();
