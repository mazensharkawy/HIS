import Router from "express";
import { insert } from "../db/clinicsdb";
import {
  clinicValidation,
  timingValidation,
} from "../middlewares/dataValidation";
const router = Router();

const insertClinic = async (req, res) => {
  let data = req.body;
  insert("Clinic", data)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
};
const insertTiming = async (req, res) => {
  let data = req.body;
  insert("Timing", data)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
};

router.post("/insert-clinic", clinicValidation, insertClinic);
router.post("/insert-timing", timingValidation, insertTiming);

export default router;
