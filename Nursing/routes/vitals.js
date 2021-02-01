import Router from "express";
import { read, addVital } from "../db/vitalsDb";
let router = Router();

const getVitals = async (req, res) => {
  let tableName = "Nursing";
  let query = req?.body || {};
  let result = await read(tableName, query);
  if (result) res.status(200).send(result);
  else res.status(400).send("failed to get vitals");
};

const addToVital = async (req, res) => {
  let tableName = "Nursing";
  let query = { patient: req?.body?.patient };

  let result = await read(tableName, query);
  let vitalName = req?.body?.vitalName;
  let vitalValue = req?.body?.vitalValue;
  if (result) {
    var newVitals = { ...result[0].vitals };
    if (result[0].vitals[vitalName]) {
      // found push to array
      newVitals[vitalName].push(vitalValue);
    } else {
      //vital not measure before
      newVitals[vitalName] = [vitalValue];
    }
    let updateQuery = {
      $set: {
        vitals: newVitals,
      },
    };
    addVital(tableName, query, updateQuery)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } else {
    // new patient so get from sratch
    res.status(404).send("no patient is found please insert patient first");
  }
};

router.get("/", getVitals);
router.post("/add", addToVital);
export default router;

// vitals --- should be an object with key and value
// to add or update vitals list search by patient's value
