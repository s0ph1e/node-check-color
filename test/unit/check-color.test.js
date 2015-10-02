var _ = require('lodash');
var expect = require('expect.js');
var ColorChecker = require('../../src/color-checker');

describe('ColorChecker', function () {

	var colorChecker;

	before(function () {
		colorChecker = new ColorChecker();
	});

	it('should be an object', function () {
		expect(colorChecker).to.be.an('object');
	});

	describe('_shades', function () {
		it('should exist', function () {
			expect(colorChecker).to.have.property('_shades');
		});

		it('should be an object', function () {
			expect(colorChecker._shades).to.be.an('object');
		});
	});

	describe('_methods', function () {
		it('should exist', function () {
			expect(colorChecker).to.have.property('_methods');
		});

		it('should be an array', function () {
			expect(colorChecker._methods).to.be.an('array');
		});
	});

	describe('init', function () {

		it('should exist', function () {
			expect(colorChecker).to.have.property('init');
		});

		it('should be a function', function () {
			expect(colorChecker.init).to.be.an('function');
		});

		it('should update _shades, remove old methods and add new', function () {
			var oldMethods = _.clone(colorChecker._methods);
			var oldShades  = _.clone(colorChecker._shades);
			var newShades = {
				a: [{ h: [0, 100] }],
				b: [{ h: [101, 355] }]
			};

			colorChecker.init(newShades);

			expect(colorChecker._methods).to.not.be.eql(oldMethods);
			expect(colorChecker._shades).to.not.be.eql(oldShades);
			for (var i = 0; i < oldMethods.length; i++) {
				expect(colorChecker).to.not.have.property([oldMethods[i]]);
			}

			expect(colorChecker._methods).to.contain('isA');
			expect(colorChecker._methods).to.contain('isB');
			expect(colorChecker._shades).to.be.eql(newShades);
			expect(colorChecker).to.have.property('isA');
			expect(colorChecker).to.have.property('isA');
		});
	});

	describe('getShade', function () {
		it('should exist', function () {
			expect(colorChecker).to.have.property('getShade');
		});

		it('should be a function', function () {
			expect(colorChecker.getShade).to.be.an('function');
		});

		it('should return shade for color based on _shades', function () {
			var newShades = {
				a: [{ h: [0, 45] }],
				b: [{ h: [46, 90] }],
				c: [{ h: [91, 135] }],
				d: [{ h: [136, 180] }],
				e: [{ h: [181, 225] }],
				f: [{ h: [226, 270] }],
				g: [{ h: [271, 315] }],
				h: [{ h: [316, 360] }]
			};

			colorChecker.init(newShades);
			expect(colorChecker.getShade('hsl(10,0,0)')).to.be('a');
			expect(colorChecker.getShade('hsl(50,0,0)')).to.be('b');
			expect(colorChecker.getShade('hsl(91,0,0)')).to.be('c');
			expect(colorChecker.getShade('hsl(140,0,0)')).to.be('d');
			expect(colorChecker.getShade('hsl(189,0,0)')).to.be('e');
			expect(colorChecker.getShade('hsl(240,0,0)')).to.be('f');
			expect(colorChecker.getShade('hsl(285,0,0)')).to.be('g');
			expect(colorChecker.getShade('hsl(333,0,0)')).to.be('h');
		});
	});

	describe('is<ShadeName>', function () {

		before(function () {
			var newShades = {
				a: [{ h: [0, 120] }],
				'a-b': [{ h: [121, 240] }],
				b: [{ h: [241, 360] }]
			};
			colorChecker.init(newShades);
		});

		it('should return true color meets shade exactly', function () {
			expect(colorChecker.isA('hsl(10,0,0)')).to.be.eql(true);
			expect(colorChecker.isAB('hsl(130,0,0)')).to.be.eql(true);
			expect(colorChecker.isB('hsl(250,0,0)')).to.be.eql(true);
		});

		it('should return false if color doesn\'t meet shade', function () {
			expect(colorChecker.isB('hsl(10,0,0)')).to.be.eql(false);
			expect(colorChecker.isA('hsl(250,0,0)')).to.be.eql(false);
		});

		it('should return true if color has intermediate shade and meets several shades', function () {
			expect(colorChecker.isA('hsl(130,0,0)')).to.be.eql(true);
			expect(colorChecker.isB('hsl(130,0,0)')).to.be.eql(true);
		});
	});

});
