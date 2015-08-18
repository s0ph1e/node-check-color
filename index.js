var parse = require('parse-color');
var _ = require('lodash');
var shades = require('./shades');

var c = '#1ADB20';
console.log('initial color = ' + c);

var obj = parse(c);
console.log('parsed color = ', obj);

var result = _.findKey(shades, function(rules, colorName) {
	var found = _.find(rules, function(rule) {
		var min = rule.h[0];
		var max = rule.h[1];
		var curr = obj.hsl[0];
		if (min <= curr && curr <= max) {
			return rule;
		}
	});
	if (found) {
		return colorName;
	}
});
console.log('result color = ' + result);