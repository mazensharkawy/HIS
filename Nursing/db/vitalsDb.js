import { MongoClient } from "mongodb";
import config from "../config";

const key = config.database;
const dbName = "HIS";

var db = null;
const createConnection = async () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      key,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, database) => {
        if (err) reject(err);
        db = database.db(dbName);
        db.once("open", () => console.log("connected to db"));
        resolve();
      }
    );
  });
};
export const read = async (table, query) => {
  if (!db) await createConnection();
  return db.collection(table).find(query).toArray();
};
export const insert = (table, data) => {
  return new Promise(async (resolve, reject) => {
    if (!db) await createConnection();
    db.collection(table).insertOne(data, (err, res) => {
      if (err) reject("error occured durin insertion");
      resolve("object inserted");
    });
  });
};

export const addVital = (table, query, updateQuery) =>
  new Promise(async (resolve, reject) => {
    if (!db) await createConnection();
    db.collection(table).update(query, updateQuery, (err, res) => {
      if (err) reject("failed in update");
      else resolve("updated vitals");
    });
  });
