'use strict';
/* Export module */
module.exports = function toFixedTwist(value, precision) {
  // Local variable
  var lowerThanOne = false;
  var precisionUsed = precision || 0;
  var stringValue = value.toString();
  var decimalPosition = stringValue.indexOf('.');
  if (value < 1) {
    value++;
    lowerThanOne = true;
  }

  /* ---- Checks ---- */
  checkArguments(value, precisionUsed);

  /* ---- Process ---- */
  if ( decimalPosition > -1 ) {
    var precisionValue = moveDecimal(value, decimalPosition + precisionUsed);
    value = moveDecimal(Math.round(precisionValue), decimalPosition);
  }
  if (lowerThanOne) {
    value--;
  }
  return value.toFixed(precisionUsed);
};


/* ---- Helper ---- */
function moveDecimal (value, decimalPosition) {
  value = value.toString();
  value = value.replace('.', '');
  var i = 0,
    newValue = '';
  value = value.split('');
  for ( i = 0; i < value.length; i++ ) {
    if (i === decimalPosition) {
      newValue += '.';
    }
    newValue += value[i];
  }
  return Number(newValue);
}

function checkArguments(value, precision) {
  // Check the value
  if (typeof value !== 'number') {
    throw new TypeError('Provide a number for value');
  }

  // Check the precision
  if (typeof precision !== 'number') {
    throw new TypeError('Provide a number for precision');
  }

  if (precision < 0 || precision > 20) {
    throw new RangeError('Precision argument must be between 0 and 20');
  } 
}
