import Router from "express";
import {insert,openDb} from "../db/clinicsdb";
const router = Router();

const insertClinic = (req,res)=> {
    const data = {
        name : "ay7aga",
        open : "date",
        close: "date",
        address : "address"
    }
    const table = "Clinic";
    insert(table,data)
    .then((iserted)=>{
        console.log("inserted");
        res.status(200).send(inserted)
    })
    .catch((err)=>{
        console.log("error");
       console.log(err);
        res.status(400).send("bad request")
    });
}

router.get('/DDl',insertClinic);
export default router;