var parse = require('parse-color');
var _ = require('lodash');
var defaultShades = require('./defaults');

function getShade (shades, color) {
	var colorObj = parse(color);
	return _.findKey(shades, function (rules, colorName) {
		var found = _.find(rules, function (rule) {
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

function ColorChecker () {
	this._shades = {};
	this._methods = [];
	this.init(defaultShades);
}

ColorChecker.prototype.init = function init (shades) {
	var self = this;

	if (shades) {
		updateShades();
		removeOldMethods();
		addNewMethods();
	}

	function updateShades () {
		self._shades = _.clone(shades);
	}

	function removeOldMethods () {
		var methodName;
		while (methodName = self._methods.pop()) {
			if (self.hasOwnProperty(methodName)) {
				delete self[methodName];
			}
		}
	}

	function addNewMethods () {
		_.forIn(self._shades, function addNewMethod (shadeValues, shadeName) {
			var methodName = _.camelCase('is-' + shadeName);
			self._methods.push(methodName);
			self[methodName] = isShade.bind(null, self._shades, shadeName);
		});
	}
};

ColorChecker.prototype.getShade = function getColorShade (color) {
	return getShade(this._shades, color);
};

module.exports = new ColorChecker();
