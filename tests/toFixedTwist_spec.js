var toFixedTwist = require('../src/toFixedTwist');

describe('toFixedTwist', function() {
  it('should return the input value as a string.', function () {
    expect(toFixedTwist(100)).toBe('100');
  });

  it('should handle numbers smaller than 1', function () {
    expect(toFixedTwist(0.5, 1)).toBe('0.5');
  });

  it('should return the input value as a string, with added precision', function () {
    expect(toFixedTwist(100, 2)).toBe('100.00');
    expect(toFixedTwist(100, 5)).toBe('100.00000');
  });

  it('should round 1.615 to 1.62', function () {
    expect(toFixedTwist(1.615, 2)).toBe('1.62');
  });

  it('should round 10.235 to 10.24', function () {
    expect(toFixedTwist(10.235, 2)).toBe('10.24');
  });

  it('should round 1.005 to 1.01', function () {
    expect(toFixedTwist(1.005, 2)).toBe('1.01');
  });

  it('should throw a TypeError error when a non-number is passed in as the first argument', function () {
    var testNumber = '100.00';
    var thrown = false;
    try {
      toFixedTwist(testNumber, 2);
    }
    catch (e) {
      expect(e.name).toBe('TypeError');
      expect(e.message).toBe('Provide a number for value');
      thrown = true;
    }
    expect(thrown).toBe(true);
  });

  it('should throw a TypeError error when a non-number is passed in as the second argument', function () {
    var testNumber = 100.00;
    var precision = '2';
    var thrown = false;
    try {
      toFixedTwist(testNumber, precision);
    }
    catch (e) {
      expect(e.name).toBe('TypeError');
      expect(e.message).toBe('Provide a number for precision');
      thrown = true;
    }
    expect(thrown).toBe(true);
  });

  it('shoul throw a RangeError when precision less than 0 or greater than 20', function () {
    var thrown = false;
    try {
      toFixedTwist(100, -1);
    }
    catch (e) {
      thrown = true;
      expect(e.message).toBe('Precision argument must be between 0 and 20');
    }
    expect(thrown).toBe(true);
  });

  /* toFixedTwist(0.5155322, 10) ==> "0.5155322000"*/
  it('should add precision to numbers lower than 1', function () {
    expect(toFixedTwist(0.5155322, 10)).toBe('0.5155322000');
  });
});
