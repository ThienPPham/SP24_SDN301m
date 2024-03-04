const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'test2'
const dboper = require('./operation');

MongoClient.connect(url).then((client) =>{
    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, {name:"Weekend Grand Buffet2", image:"images/buffet.png", label:"New", price:"19.99", description:"Featuring...", featured: "false"}, "promotions")
    .then((result) =>{
        console.log("Insert Document:\n", result.ops);

        return dboper.findDocuments(db, "promotions");
    })
    .then((docs) =>{
        console.log("Found documents:\n", docs);

        return dboper.updateDocument(db, {name:"Weekend Grand Buffet"}, {description: "Updated Featured"}, "promotions");
    })
    .then((result) =>{
        console.log("Updated Document:\n", result.result);

        return dboper.findDocuments(db, "promotions");
    })
    .then((docs) =>{
        console.log("Found document updated:\n ", docs);

        return dboper.removeDocument(db, {}, "promotions");
    })
    then((result) =>{
        console.log("Dropped Collection: ", result);

        return client.close();
    })
    .catch((err) => console.log(err));
})

.catch((err) => console.log(err));

//dropCollection