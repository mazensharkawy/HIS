import Router from "express";
import { getDistinctValues, read } from "../db/clinicsdb";

const router = Router();

const getDoctors = async (req, res) => {
  let query = req.query || {};
  let tableName = "Doctors";
  let doctors = await read(tableName, query);
  let departments = await getDistinctValues(tableName, "department");
  if (doctors && departments) {
    res.status(200).send({ doctors, departments });
  } else {
    console.log("error ", { doctors });
    res.status(400).send();
  }
};
router.get("/", getDoctors);
export default router;
