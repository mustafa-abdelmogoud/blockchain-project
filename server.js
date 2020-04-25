const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const truffle_connect = require("./connection");
const bodyParser = require("body-parser");

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

  res.json({
    code: 200,
    id: patient.id,
    name: patient.name,
    descriptions: patient.descriptions
  });
});

app.post("/description", async (req, res) => {
  const { id, description } = req.body;

  await truffle_connect.addDescription(id, description);

  res.json({ code: 200, id, description });
});

app.listen(port, () => {
  console.log("Express Listening at http://localhost:" + port);
});
