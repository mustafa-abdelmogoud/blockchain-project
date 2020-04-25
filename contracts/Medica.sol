pragma experimental ABIEncoderV2;


contract Medica {
    struct Patient {
        string id;
        string name;
        string[] descriptions;
    }

    mapping(string => Patient) public patients;

    function addPatient(string memory _id, string memory _name)
        public
        returns (bool success)
    {
        patients[_id] = Patient(_id, _name, new string[](0));
        return true;
    }

    function getPatient(string memory _id)
        public
        view
        returns (Patient memory patient)
    {
        return patients[_id];
    }

    function addDescription(string memory _id, string memory _description)
        public
        returns (bool success)
    {
        patients[_id].descriptions.push(_description);
        return true;
    }
}
