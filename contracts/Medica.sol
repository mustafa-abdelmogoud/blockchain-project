pragma experimental ABIEncoderV2;


contract Medica {
    struct Visit {
        string doctor;
        string description;
        string hospital;
        string diagnose;
        string[] symptoms;
        string[] treatments;
    }
    struct Patient {
        string id;
        string name;
        Visit[] diagnosis;
    }

    mapping(string => Patient) public patients;

    function addPatient(string memory _id, string memory _name)
        public
        returns (bool success)
    {
        patients[_id].id = _id;
        patients[_id].name = _name;
        return true;
    }

    function getPatient(string memory _id)
        public
        view
        returns (Patient memory patient)
    {
        return patients[_id];
    }

    function addDescription(
        string memory _id,
        string memory _doctor,
        string memory _description,
        string memory _hospital,
        string memory _diagnose,
        string[] memory _symptoms,
        string[] memory _treatments
    ) public returns (bool success) {
        patients[_id].diagnosis.push(
            Visit(
                _doctor,
                _description,
                _hospital,
                _diagnose,
                _symptoms,
                _treatments
            )
        );
        return true;
    }
}
