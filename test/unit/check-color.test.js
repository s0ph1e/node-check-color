var _ = require('lodash');
var expect = require('expect.js');
var checkColor = require('../../src/check-color');

describe('checkColor', function () {

	it('should be an object', function () {
		expect(checkColor).to.be.an('object');
	});

	describe('_shades', function () {
		it('should exist', function () {
			expect(checkColor).to.have.property('_shades');
		});

		it('should be an object', function () {
			expect(checkColor._shades).to.be.an('object');
		});
	});

	describe('_methods', function () {
		it('should exist', function () {
			expect(checkColor).to.have.property('_methods');
		});

		it('should be an array', function () {
			expect(checkColor._methods).to.be.an('array');
		});
	});

	describe('init', function () {

		it('should exist', function () {
			expect(checkColor).to.have.property('init');
		});

		it('should be a function', function () {
			expect(checkColor.init).to.be.an('function');
		});

		it('should update _shades, remove old methods and add new', function () {
			var oldMethods = _.clone(checkColor._methods);
			var oldShades  = _.clone(checkColor._shades);
			var newShades = {
				a: [{ h: [0, 100] }],
				b: [{ h: [101, 355] }]
			};

			checkColor.init(newShades);

			expect(checkColor._methods).to.not.be.eql(oldMethods);
			expect(checkColor._shades).to.not.be.eql(oldShades);
			for (var i = 0; i < oldMethods.length; i++) {
				expect(checkColor).to.not.have.property([oldMethods[i]]);
			}

			expect(checkColor._methods).to.contain('isA');
			expect(checkColor._methods).to.contain('isB');
			expect(checkColor._shades).to.be.eql(newShades);
			expect(checkColor).to.have.property('isA');
			expect(checkColor).to.have.property('isA');
		});
	});

	describe('getShade', function () {
		it('should exist', function () {
			expect(checkColor).to.have.property('getShade');
		});

		it('should be a function', function () {
			expect(checkColor.getShade).to.be.an('function');
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

			checkColor.init(newShades);
			expect(checkColor.getShade('hsl(10,0,0)')).to.be('a');
			expect(checkColor.getShade('hsl(50,0,0)')).to.be('b');
			expect(checkColor.getShade('hsl(91,0,0)')).to.be('c');
			expect(checkColor.getShade('hsl(140,0,0)')).to.be('d');
			expect(checkColor.getShade('hsl(189,0,0)')).to.be('e');
			expect(checkColor.getShade('hsl(240,0,0)')).to.be('f');
			expect(checkColor.getShade('hsl(285,0,0)')).to.be('g');
			expect(checkColor.getShade('hsl(333,0,0)')).to.be('h');
		});
	});

	describe('is<ShadeName>', function () {

		before(function () {
			var newShades = {
				a: [{ h: [0, 120] }],
				'a-b': [{ h: [121, 240] }],
				b: [{ h: [241, 360] }]
			};
			checkColor.init(newShades);
		});

		it('should return true color meets shade exactly', function () {
			expect(checkColor.isA('hsl(10,0,0)')).to.be.eql(true);
			expect(checkColor.isAB('hsl(130,0,0)')).to.be.eql(true);
			expect(checkColor.isB('hsl(250,0,0)')).to.be.eql(true);
		});

		it('should return false if color doesn\'t meet shade', function () {
			expect(checkColor.isB('hsl(10,0,0)')).to.be.eql(false);
			expect(checkColor.isA('hsl(250,0,0)')).to.be.eql(false);
		});

		it('should return true if color has intermediate shade and meets several shades', function () {
			expect(checkColor.isA('hsl(130,0,0)')).to.be.eql(true);
			expect(checkColor.isB('hsl(130,0,0)')).to.be.eql(true);
		});
	});

});
