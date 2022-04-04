// change mocha output colors
// see https://stackoverflow.com/questions/51145431/node-change-colors-on-the-output-when-testing-with-mocha

// some colors - see https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
const green = 92;
const red = 91;

// make changes
const colors = require('mocha/lib/reporters/base').colors;
colors['pass'] = green;
colors['fail'] = red;
colors['error message'] = red;
colors['checkmark'] = green;
colors['green'] = green;

// others
// const colors = {
//   'pass': green, //32,
//   'fail': red, //31,
//   'bright pass': 92,
//   'bright fail': 91,
//   'bright yellow': 93,
//   'pending': 36,
//   'suite': 0,
//   'error title': 0,
//   'error message': red, //31,
//   'error stack': 90,
//   'checkmark': green, //32,
//   'fast': 90,
//   'medium': 33,
//   'slow': 31,
//   'green': green, //32,
//   'light': 90,
//   'diff gutter': 90,
//   'diff added': 32,
//   'diff removed': 31
// };
