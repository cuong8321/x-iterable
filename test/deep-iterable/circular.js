
function main() {
	'use strict';

	var DeepIterable = require('x-iterable/deep-iterable');
	var Class = DeepIterable.Circular;
	var TestResult = require('../test-result');

	var array = [0, 1, 2, 3, 'abc', ['abcdef'], [[0, 1, 2]]];
	array.push(array, [[array], array]);
	array = [array, 'final', [array]];

	var args = [
		array,
		DeepIterable.ANY_DEEPER
	];

	return {
		'example': new TestResult(Class, args)
	};

}

module.exports = main();
