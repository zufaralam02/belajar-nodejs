const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/wpu', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// // add 1 data
// const contact1 = new Contact({
//     name: 'Fulanah',
//     phone: '081298765432',
//     email: 'fulanah@gmail.com'
// })

// // save to collection
// contact1.save().then((contact) => console.log(contact))