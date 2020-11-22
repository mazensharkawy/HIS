import Promise from "bluebird";
import { promises as fs } from "fs";
import { MongoClient } from "mongodb";
import config from "./config";

let production = false; //process.env.NODE_ENV === 'production';
const key = config.database;
// const dbName = production ? "blloc" : "blloc-staging";
const dbName = "HIS";

let db = null;
let connect = (cb) => {
  console.log("Connecting to db");
  MongoClient.connect(
    key,
    {
      useNewUrlParser: true,
    },
    (err, database) => {
      if (err) return console.log(err);
      console.log("db connected");
      db = database.db(
        process.env.NODE_ENV !== "production" ? "blloc-staging" : "blloc"
      );
      cb && cb();
    }
  );
};

export default class Database {
  static databaseObj(cb) {
    if (!db) return connect(() => cb(db));
    return cb(db);
  }
  static async openDb() {
    return MongoClient.connect(key, { useNewUrlParser: true }).then(
      (dbc) => (db = dbc.db(dbName))
    );
  }

  static async read({ tableName, query }) {
    if (!db) await this.openDb();
    return db.collection(tableName).find(query).toArray();
  }

  static async write({ tableName, object }) {
    if (!db) await this.openDb();
    console.log("DB: " + db.dbName);
    console.log("Object to write: " + object);

    return db.collection(tableName).insertOne(object, function (err) {
      if (err) {
        console.log("ops !! an error inserting");
        console.log(err);
      } else console.log("1 document inserted");
    });
  }

  static async getOrders() {
    return this.read({ tableName: "Orders", query: {} });
  }

  static async loadOffline() {
    return fs.readFile("data.json");
  }
}
export class AsyncDatabase {
  static async update({ collection, query, update }) {
    return new Promise(async (resolve, reject) => {
      let updated = null;
      if (!db) await AsyncDatabase.connect();
      updated = db
        .collection(collection)
        .update(query, update, { upsert: false });
      if (updated) resolve(updated);
      else reject(updated);
    });
  }

  static async findOneAndUpdate({ collection, query, update }) {
    return new Promise(async (resolve, reject) => {
      if (!db) await AsyncDatabase.connect();
      db.collection(collection).findOneAndUpdate(
        query,
        update,
        { upsert: false, returnOriginal: false },
        (err, result) => {
          if (err) reject(err);
          resolve(result.value);
        }
      );
    });
  }

  static async connect() {
    return new Promise((resolve, reject) => {
      connect(resolve);
    });
  }
  static async writeToDb({ data, table }) {
    return new Promise(async (resolve, reject) => {
      if (!db) await AsyncDatabase.connect();
      db.collection(table).insertMany(data, (err, res) => {
        if (err) reject(err);
        else resolve("done");
      });
    });
  }
  static async findMany({ query, table }) {
    return new Promise(async (resolve, reject) => {
      if (!db) await Database.openDb();
      db.collection(table)
        .find(query)
        .toArray((err, record) => {
          if (err || !record) return reject("not found");
          else resolve(record);
        });
    });
  }

  static async findDb({ query, table }) {
    return new Promise(async (resolve, reject) => {
      if (!db) await Database.openDb();
      db.collection(table).findOne(query, (err, record) => {
        if (err || !record) return reject("not found");
        else resolve(record);
      });
    });
  }
}
