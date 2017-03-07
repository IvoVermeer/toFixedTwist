/* exported fail, assert, assertEquals, eq, assertStrictEquals, tests*/
/*eslint no-console: 0*/
/*
  Very simple in-browser unit-test library, with zero deps.

  Based off of Joe Walnes' jstinytest: https://github.com/joewalnes/jstinytest/
 */
var tinyTestHelper = {
	/**
	 * Renders the test statistics
	 * @param  {array} 	tests    	Array of test-objects
	 * @param  {number} failures 	Number of failures
	 */
	renderStats: function (tests, failures) {
		var numberOfTests = Object.keys(tests).length;
		var numberOfSuccesses = numberOfTests - failures;
		var summaryString = 'Ran ' + numberOfTests + ' tests: ' +
							numberOfSuccesses + ' successes, ' +
							failures + ' failures';
		var summaryElement = document.createElement('h1');
		summaryElement.textContent = summaryString;
		document.body.appendChild(summaryElement);
	}
};
var TinyTest = {
	run: function(tests) {
		var failures = 0;
		for (var testName in tests) {
			var testAction = tests[testName];
			try {
				testAction.apply(this);
				console.log('%c' + testName, 'color: green;');
			} catch (e) {
				failures++;
				console.groupCollapsed('%c' + testName, 'color: red;');
				console.error(e.stack);
				console.groupEnd();
			}
		}
		setTimeout(function() { // Give document a chance to complete
			if (window.document && document.body) {
				document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
				tinyTestHelper.renderStats(tests, failures);
			}
		}, 0);
	},

	fail: function(msg) {
		throw new Error('fail(): ' + msg);
	},

	assert: function(value, msg) {
		if (!value) {
			throw new Error('assert(): ' + msg);
		}
	},

	assertEquals: function(expected, actual) {
		if (expected != actual) {
			throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
		}
	},

	assertStrictEquals: function(expected, actual) {
		if (expected !== actual) {
			throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
		}
	},
};

var fail 				= TinyTest.fail.bind(TinyTest),
	assert 				= TinyTest.assert.bind(TinyTest),
	assertEquals 		= TinyTest.assertEquals.bind(TinyTest),
	// Default eq to strict equality
	eq 					= TinyTest.assertStrictEquals.bind(TinyTest), // alias for assertEquals
	assertStrictEquals 	= TinyTest.assertStrictEquals.bind(TinyTest),
	tests 				= TinyTest.run.bind(TinyTest);
