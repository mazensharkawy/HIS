import _ from "lodash";

export const clinicValidation = (req, res, next) => {
  let data = req.body;

  let errors = {};

  if (!data["name"]) errors["name missing"] = 1;
  if (!data["address"]) errors["address missing"] = 1;
  if (!data["open"]) errors["open time missing"] = 1;
  if (!data["close"]) errors["close time missing"] = 1;

  if (typeof data["open"] != "object" || typeof data["close"] != "object")
    if (!errors["open time missing"] && !errors["close time missing"])
      errors["open and close should be Date format"] = 1;

  if (typeof data["name"] != "string" || typeof data["address"] != "string")
    if (!errors["name missing"] && !errors["address missing"])
      errors["name and address should be strings"] = 1;

  if (_.keys(errors) == 0) next();
  else {
    let err = "Data invalid: " + _.keys(errors).toString();
    res.status(400).send(err);
  }
};

export const timingValidation = (req, res, next) => {
  let data = req.body;
  let errors = {};

  if (!data["doctor"]) errors["doctor _id missing"] = 1;
  if (!data["clinic"]) errors["clinic _id missing"] = 1;
  if (!data["start"]) errors["start time missing"] = 1;
  if (!data["end"]) errors["end time missing"] = 1;

  if (typeof data["start"] != "object" || typeof data["end"] != "object")
    if (!errors["start time missing"] && !errors["end time missing"])
      errors["start and end should be 'Date' format"] = 1;

  if (typeof data["doctor"] != "string" || typeof data["clinic"] != "string")
    if (!errors["doctor _id missing"] && !errors["clinic _id missing"])
      errors["doctor and clinic should be _id strings"] = 1;

  if (_.keys(errors) == 0) next();
  else {
    let err = "Data invalid: " + _.keys(errors).toString();
    res.status(400).send(err);
  }
};
