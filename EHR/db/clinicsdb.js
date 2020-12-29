const {MongoClient} = require('mongodb');
import config from "../config";
const key = config.database;
const dbName = "HIS";

var db = null;
const createConnection =  async (fnc)=>{
    console.log("in connect");
//  MongoClient.connect(key,
//     {
//       useNewUrlParser: true,
//     },
//     (err, database) => {
//       if (err) return console.log(err);
//       console.log(database);
//       db = database.db(dbName);
//       console.log('in connect',database.db());
//     //   cb && cb();
//     }
//   );
   MongoClient.connect(key,{useNewUrlParser:true}, async (err,database)=>{
    if(err){
        console.log("error connecting: "+ err);
    }else{
        console.log("database:  "+database);
            console.log("database2:  "+database.db(dbName));
            
            db = database.db(dbName);
            await fnc();
    }
   });
//    .then((database)=>{

//             // console.log("database:  "+database);
//             // console.log("database2:  "+database.db(dbName));
            
//             db = database.db(dbName);
        
//     }).catch((err)=>{
//         console.log("error connecting: "+err);
//     })
};


    // export const  openDb = async ()=> {
    //   return MongoClient.connect(key, { useNewUrlParser: true }).then(
    //     (dbc) => (db = dbc.db(dbName))
    //   );
    // }

    export const read= async (table,query)=>{
        if (!db) await createConnection();
        return await db.collection(table).find(query).toArray();
    }
    /**
     * return value => Promise
     */
    export const insert = async (table,data)=>{
        console.log('db:',db);
        if (!db){
              await createConnection(()=>{ db.collection(table).insertOne(data);});
             console.log("connection created:" + db );
            }
        console.log("inserting",db);
        // db.collection(table).insertOne(data);

    }