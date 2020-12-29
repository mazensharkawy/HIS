import Router from "express";
import { insert, openDb } from "../db/clinicsdb";
const router = Router();

const insertClinic = async (req, res) => {
  const data = {
    name: "ay7aga",
    open: "date",
    close: "date",
    address: "address",
  };
  const table = "Clinic";

  insert(table, data)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
};

router.get("/DDl", insertClinic);
export default router;
