// Core Module

// File System
const fs = require('fs');

// menuliskan string ke file (synchronous)
// try {
//     fs.writeFileSync('data/test.txt', 'Hello World synchronous');
// } catch (error) {
//     console.log(error);
// }

// menuliskan string ke file (asynchronous)
// fs.writeFile('data/test.txt', 'Hello World asynchronous', (error) => {
//     console.log(error);
// });

// membaca isi file (synchronous)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// // console.log(data.toString());
// console.log(data);

// membaca isi file (asynchronous)
// fs.readFile('data/test.txt', 'utf-8', (error, data) => {
//     if (error) throw error;
//     console.log(data);
// });

// readline
const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('Your name : ', (name) => {
//     rl.question('Your age : ', (age) => {
//         console.log(`Thanks ${name}, your age is ${age}`);
//         rl.close();
//     });
// });

// challenge
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Your name : ', (name) => {
    rl.question('Your age : ', (age) => {

        const contact = { name, age };
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);

        contacts.push(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

        console.log('Thank you');

        rl.close();
    });
});