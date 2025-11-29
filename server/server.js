const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');

// create the app
const app = express();
const port = 5001;

// use middleware
app.use(cors());
app.use(express.json());

// start the server
async function run() {

    // using in-memory db for now
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    // connect to mongo
    await mongoose.connect(uri);
    console.log("Connected to database!");

    // my routes
    const apiRoutes = require('./routes/api');
    app.use('/api', apiRoutes);

    // listen on port
    app.listen(port, () => {
        console.log("Server started on port " + port);
    });
}

run();
