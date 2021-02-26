import Router from "express";

import Database from "../db/EHRdb";
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
    NathionalID,
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
      NathionalID,
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

router.get("/", getEHR);
router.post("/getEHRbyid", getEHRByID);
router.post("/getEHRbyphone", getEHRByPhone);

router.post("/addrecipient", addRecipient);

export default router;
