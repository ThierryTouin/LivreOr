"use strict";

// Type 1: In-memory only datastore (no need to load the database)
let Datastore = require('nedb')
let db = new Datastore();


module.exports = db
