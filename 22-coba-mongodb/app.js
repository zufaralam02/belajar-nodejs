const { MongoClient, ObjectID } = require('mongodb')

const uri = 'mongodb://127.0.0.1:27017'
const dbName = 'wpu'

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

client.connect((error, client) => {
    if (error) {
        return console.log('Connection failed')
    }

    // console.log('Connection successful')

    // select database
    const db = client.db(dbName)

    // insert 1 data to student collection
    // db.collection('student').insertOne(
    //     {
    //         name: 'Test',
    //         email: 'test@gmail.com'
    //     },
    //     (error, result) => {
    //         if (error) {
    //             return console.log('Failed to add data')
    //         }

    //         console.log(result)
    //     }
    // )

    // insert many data
    // db.collection('student').insertMany(
    //     [
    //         {
    //             name: 'Test',
    //             email: 'test@gmail.com'
    //         },
    //         {
    //             name: 'Tester',
    //             email: 'tester@gmail.com'
    //         }
    //     ],
    //     (error, result) => {
    //         if (error) {
    //             return console.log('Failed to add data')
    //         }

    //         console.log(result)
    //     }
    // )

    // show all data in student collection
    // db.collection('student').find().toArray((error, result) => {
    //     console.log(result)
    // })

    // show data with condition
    // db.collection('student').find({ name: 'Test' }).toArray((error, result) => {
    //     console.log(result)
    // })
    // db.collection('student').find({ _id: ObjectID('60be199cfd9e0334c8e6167c') }).toArray((error, result) => {
    //     console.log(result)
    // })

    // updata data with id
    // const updatePromise = db.collection('student').updateOne(
    //     {
    //         _id: ObjectID('60be199cfd9e0334c8e6167c')
    //     },
    //     {
    //         $set: {
    //             email: 'ali@gmail.com'
    //         }
    //     }
    // )

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // update many data with name
    // db.collection('student').updateMany(
    //     {
    //         name: 'Test'
    //     },
    //     {
    //         $set: {
    //             name: 'Umar'
    //         }
    //     }
    // )

    // delete 1 data
    // db.collection('student').deleteOne(
    //     {
    //         _id: ObjectID('60be199cfd9e0334c8e6167c')
    //     }
    // ).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // delete many data
    db.collection('student').deleteMany(
        {
            name: 'Umar'
        }
    ).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})