import Router from "express";

import Database, { AsyncDatabase } from "../db/EHRdb";
import { verifyTokenMiddleware } from "../middlewares/token";

const router = Router();
let tableName = "EHR";

const getEHR = async (req, res) => {
  //get _id from sql and sub in query
  let query = req.query || {};
  let EHR = await Database.read({
    tableName,
    query,
  });
  res.status(200).send(EHR);
};
const getEHRByID = async (req, res) => {
  let { ID } = req.body;
  let query = {
    "Recipient.NathionalID": { $regex: `.*${ID}.*` },
  };
  let EHR = await Database.read({
    tableName,
    query,
  });
  res.status(200).send(EHR);
};
const getEHRByPhone = async (req, res) => {
  let { Phone } = req.body;
  let query = {
    "Recipient.Demographic.Phone": { $regex: `.*${Phone}.*` },
  };
  let EHR = await Database.read({
    tableName,
    query,
  });
  res.status(200).send(EHR);
};
const addRecipient = async (req, res) => {
  let {
    NationalID,
    FirstName,
    LastName,
    Title,
    Address,
    Phone,
    DOB,
    Sex,
    EmergencyContact,
  } = req.body;
  let object = {
    Recipient: {
      NationalID,
      Name: {
        FirstName,
        LastName,
        Title,
      },
      Demographic: {
        Address,
        Phone,
      },
      DOB: new Date(DOB),
      Sex,
      EmergencyContact,
    },
    Encounter: [],
  };
  let writeStatus = await Database.write({ tableName, object });
  if (writeStatus.result.ok === 1) res.status(200).send({ inserted: true });
  else res.status(400).send({ inserted: false });
};

const updateEHR = async (req, res) => {
  try {
    let { _id } = req.user;
    let update = req.body;
    await AsyncDatabase.findOneAndUpdate({
      collection: tableName,
      query: { _id: _id },
      update,
    });
    res.status(200).send({ updated: true });
  } catch (error) {
    res.status(400).send(error);
  }
};
const deleteEHR = async (req, res) => {
  try {
    let { _id } = req.body;
    await Database.delete(tableName, _id);
    res.status(200).send({ deleted: true });
  } catch (err) {
    res.status(400).send({ deleted: false });
  }
};

router.get("/", getEHR);
router.post("/getEHRbyid", getEHRByID);
router.post("/getEHRbyphone", getEHRByPhone);
router.post("/getbyid", getEHRByID);
router.post("/getbyphone", getEHRByPhone);

router.post("/", addRecipient);
router.put("/", updateEHR);
router.delete("/", deleteEHR);
export default router;
