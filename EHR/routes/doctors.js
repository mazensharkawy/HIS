import Router from "express";
import { read } from "../db/clinicsdb";

const router = Router();
const DEPARTMENTS = ["dep1", "dep2"];

const getDoctors = async (req, res) => {
  let query = req.body || {};
  let tableName = "Doctors";
  let doctors = await read(tableName, query);
  if (doctors) {
    console.log({ doctors });
    res.status(200).send({ doctors });
  } else {
    console.log("error ", { doctors });
    res.status(400).send();
  }
};

const getDepartments = (req, res) => {
  res.status(200).send(DEPARTMENTS);
};
router.post("/getDoctors", getDoctors);
router.post("/getDepartments", getDepartments);
export default router;
