const Medica = artifacts.require("Medica");

contract("Medica", function(accounts) {
  let medicaInstance;

  beforeEach(async () => {
    medicaInstance = await Medica.new();
  });

  it("should add new patient", async () => {
    await medicaInstance.addPatient("123456789012", "mustafa", {
      from: accounts[0]
    });
    const patient = await medicaInstance.patients.call("123456789012");
    assert.equal("123456789012", patient.id, "patient not added");
  });

  it("should get patient", async () => {
    await medicaInstance.addPatient("123456789012", "mustafa", {
      from: accounts[0]
    });
    const patient = await medicaInstance.getPatient("123456789012");

    assert.equal("123456789012", patient.id, "patient not added");
  });

  it("should add description", async () => {
    await medicaInstance.addPatient("123456789012", "mustafa", {
      from: accounts[0]
    });

    await medicaInstance.addDescription("123456789012", "Sick", {
      from: accounts[0]
    });

    const patient = await medicaInstance.getPatient("123456789012");

    assert.equal("Sick", patient.descriptions[0], "patient not added");
  });
});
