tests({
	'It should return the input value as a string.': function () {
		eq(toFixedTwist(100), '100');
	},
	'It should return the input value as a string, with added precision': function () {
		eq(toFixedTwist(100, 2), '100.00');
		eq(toFixedTwist(100, 5), '100.00000');
	},
	'It should round 1.615 to 1.62': function () {
		eq(toFixedTwist(1.615, 2), '1.62');
	},
	'It should round 10.235 to 10.24': function () {
		eq(toFixedTwist(10.235, 2), '10.24');
	},
	'It should round 1.005 to 1.01': function () {
		eq(toFixedTwist(1.005, 2), '1.01');
	},
	'It should throw a TypeError error when a non-number is passed in as the first argument': function () {
		var testNumber = '100.00';
		var thrown = false;
		try {
			toFixedTwist(testNumber, 2);
		}
		catch (e) {
			eq(e.name, 'TypeError');
			eq(e.message, 'Provide a number for value');
			thrown = true;
		}
		eq(thrown, true);
	},
	'It should throw a TypeError error when a non-number is passed in as the second argument': function () {
		var testNumber = 100.00;
		var precision = '2';
		var thrown = false;
		try {
			toFixedTwist(testNumber, precision);
		}
		catch (e) {
			eq(e.name, 'TypeError');
			eq(e.message, 'Provide a number for precision');
			thrown = true;
		}
		eq(thrown, true);
	},
	'It shoul throw a RangeError when precision less than 0 or greater than 20': function () {
		var thrown = false;
		try {
			toFixedTwist(100, -1);
		}
		catch (e) {
			thrown = true;
			eq(e.message, 'Precision argument must be between 0 and 20');
		}
		eq(thrown, true);
	},
});
