import Router from "express";
import { insert } from "../db/clinicsdb";
import { clinicValidation } from "../middlewares/dataValidation";
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

router.post("/insert", clinicValidation, insertClinic);
export default router;
