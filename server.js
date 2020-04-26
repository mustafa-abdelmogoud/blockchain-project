const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000 || process.env.PORT;
const truffle_connect = require("./connection");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.post("/profile", async (req, res) => {
  const { id, name } = req.body;

  // TODO:: handle if profile already exist
  await truffle_connect.addPatient(id, name);
  res.json({ code: 201, id, name });
});

app.get("/search", async (req, res) => {
  const { id } = req.query;

  const patient = await truffle_connect.getPatient(id);

  const diagnosis = patient.diagnosis.map(
    ({ doctor, description, hospital, diagnose, symptoms, treatments }) => ({
      doctor,
      description,
      hospital,
      diagnose,
      symptoms,
      treatments
    })
  );

  res.json({
    code: 200,
    id: patient.id,
    name: patient.name,
    diagnosis: diagnosis
  });
});

app.post("/description", async (req, res) => {
  const {
    id,
    doctor,
    description,
    hospital,
    diagnose,
    symptoms,
    treatments
  } = req.body;

  await truffle_connect.addDescription(
    id,
    doctor,
    description,
    hospital,
    diagnose,
    symptoms,
    treatments
  );

  res.json({
    code: 200,
    id,
    doctor,
    description,
    hospital,
    diagnose,
    symptoms,
    treatments
  });
});

app.listen(port, () => {
  console.log("Express Listening at http://localhost:" + port);
});
