const connection = require('../config/db1');


exports.getSubjectIds = async (req,res) => {
    try{
        const userId = req.session.userId;
        const sujectQuery = "SELECT * from subjectDB"

        const subjctsids = await connection.query(sujectQuery)

        if (sujectQuery!== null) {
            res.json(subjctsids[0]);
        } else { 
            res.status(404).send("subject database not addded please add it")
        }
    } catch (err) {
        res.status(500).send(err)
    }
}