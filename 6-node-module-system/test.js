// console.log('Hello World');

function printName(name) {
    return `Hi, iam ${name}`;
}

// console.log(printName('Allam'));

const PI = 3.14;

const student = {
    name: 'Fulan',
    age: 20,
    printStudent() {
        return `Hello, iam ${this.name} and iam ${this.age} years old`
    }
}

class Thing {
    constructor() {
        console.log('The Thing is builded');
    }
}

// module.exports.printName = printName;
// module.exports.PI = PI;
// module.exports.student = student;
// module.exports.Thing = Thing;

// module.exports = {
//     printName: printName,
//     PI: PI,
//     student: student,
//     Thing: Thing
// };

module.exports = {
    printName,
    PI,
    student,
    Thing
};