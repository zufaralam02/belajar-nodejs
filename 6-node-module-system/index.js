// const name = 'Allam';

// const printName = (name) => `Hi, iam ${name}`;

// console.log(printName(name));

// const fs = require('fs'); // core module
// const printName = require('./test'); // local module
// const moment = require('moment'); // third party module / npm module / node_modules

// console.log('Hello Node JS');

// const printName = require('./test');
// const PI = require('./test');
const test = require('./test');

console.log(test.printName('Allam'), test.PI, test.student.printStudent(), new test.Thing());
