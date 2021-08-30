const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const config = require("../config.js");

var state = {
  db: null
};
const mongoClient = new MongoClient(config.urlDB, { useNewUrlParser: true });

exports.connect = function (done) {
  if(state.db) {
    return done();
  }

  mongoClient.connect(function(err, db){
    if(err) {
      return done(err);
    }
    state.db = db;
    done();
  })
}

exports.get = function() {
  return state.db.db(config.nameDB);
}

exports.obj = function() {
  return ObjectID;
}
