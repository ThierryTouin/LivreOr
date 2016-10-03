"use strict";

let connection = require('../config/db')
let moment = require('../config/moment')


class Message {

  constructor (row) {
    this.row = row
  }

  get id() {
    return this.row._id
  }

  get content() {
    return this.row.content
  }

  get created_at() {
    return moment(this.row.created_at)
  }

  static create (content, cb) {

    var doc = {
                content: content,
                created_at: new Date()
               };
    connection.insert(doc, function (err, newDoc) {
      if (err) throw err

      console.log('id=' + newDoc._id)

      cb(newDoc)
    });
  }

  static all (cb) {

    // Find all documents in the collection
    connection.find({}, function (err, docs)  {
      if (err) throw err
      //cb(docs)
      cb(docs.map(row => new Message(row)))

    });
  }

  static find (id, cb) {

    // Find all documents in the collection
    connection.find({_id : id}, function (err, docs)  {
      if (err) throw err
      cb(new Message(docs[0]))

    });
  }

}


module.exports = Message
