
((module) => {
	'use strict';

	var createClass = require('./create-class.js');
	var isIterable = require('./utils/is-iterable.js');
	var Root = require('./root.js').class;

	var _key_iterator = Symbol.iterator;

	class DeepIterable extends Root {

		constructor(base, deeper) {
			super();
			this.base = base;
			this.deeper = typeof deeper === 'function' ? deeper : isIterable;
		}

		* [_key_iterator]() {
			var deeper = this.deeper;
			var base = this.base;
			if (deeper(base)) {
				for (let element of base) {
					yield * new DeepIterable(element, deeper);
				}
			} else {
				yield base;
			}
		}

		static createXIterable(Base, deeper) {

			return class extends createClass(Base) {

				constructor(...args) {
					super(...args);
				}

				* [_key_iterator]() {
					yield * new DeepIterable(this, deeper);
				}

			};

		}

	}

	module.exports = DeepIterable;

	DeepIterable.XIterable = createClass(DeepIterable);

})(module);
