// controllers/authController.js
const connection = require('../config/db1');


exports.loginStudent = async (req, res) => {
  console.log("tryong login")
  const { userId, password } = req.body;
  
  const query1 = 'SELECT * FROM student12 WHERE student_id = ?';

  try {
    const [results] = await connection.query(query1, [userId]);
    if (results.length > 0) {
      const student = results[0];

      if (student.password === password) {
        // Set session or any other login logic here
        req.session.userId = student.student_id;
        res.send('Logged in successfully!');
      } else {
        res.status(401).send('Invalid credentials');
      }
    } else {
      res.status(404).send('Student not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.changePassword = async (req, res) => {
    const { newPassword } = req.body;
    const userId = req.session.userId; // Assuming userId is stored in the session
  
    // Update password in the database
    const updateQuery = 'UPDATE student12 SET password = ? WHERE student_id = ?';
  
    await connection.query(updateQuery, [newPassword, userId], (err, result) => {
      if (err) {
        console.error('Error updating password:', err);
        res.status(500).send('Error updating password');
      } else {
        console.log('Password updated successfully');
        res.send('Password updated successfully');
      }
    });
  };

  // getting the student data 
  exports.getstudentData = async (req, res) => {
    try {
      const userId = req.session.userId;
      const selectQuery = 'SELECT * FROM student12 WHERE student_id = ?';
      // Use promise-based query execution
      const [rows, fields] = await connection.query(selectQuery, [userId]);
      if (rows.length > 0) {
        const studentData = rows[0];
        res.json(studentData);
      } else {
        res.status(404).send('Student not found');
      }
    } catch (err) {
      console.log('Error fetching user data:', err);
      res.status(500).send(err);
    }
  };
  
// getting available subject data for student 
// [
//   {
//     "subjectsId": "[101,102]"
//   }
// ]
exports.getStudentSubjects = async (req,res) => {
  try {
    const userId = req.session.userId;
    const subjectQuery = "SELECT subjectsId from student WHERE student_id = ?";

    const subjects = await connection.query(subjectQuery, [userId]);
    if (subjects !== null) {
      res.json(subjects[0])
    } else {
      res.status(404).send('student not found')
    } 


  } catch (err) {
     res.status(500).send(err)
  }
}

