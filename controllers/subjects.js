const connection = require('../config/db1');


exports.getSubjectIds = async (req,res) => {
    try{
        const userId = req.session.userId;
        const sujectQuery = "SELECT * from subjectsDb"

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



exports.getCourses = async (req,res) => {
    try{
        
        const courseQuery = "SELECT * from coursesDb1"
        console.log('etching course')

        const courses = await connection.query(courseQuery)

        if (courseQuery!== null) {
            res.json(courses[0]);
        } else { 
            res.status(404).send("subject database not addded please add it")
        }
    } catch (err) {
        res.status(500).send(err)
    }
}