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
	});

	describe('getShade', function () {
		it('should exist', function () {
			expect(checkColor).to.have.property('getShade');
		});

		it('should be a function', function () {
			expect(checkColor.getShade).to.be.an('function');
		});
	});

});
