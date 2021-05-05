const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('fulan@gmail.com'));
// console.log(validator.isMobilePhone('081212345678', 'id-ID'));
// console.log(validator.isNumeric('123a'));

// console.log(chalk.blue('Hello World'));
// console.log(chalk.black.bgWhite('Hello World'));
// console.log(chalk.italic('Hello World'));
const name = 'Fulan';
const message = chalk`Lorem ipsum dolor {bgRed.black.bold sit amet}, consectetur {bgGreen.italic.black adipiscing elit},
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. He is ${name}`;
console.log(message);