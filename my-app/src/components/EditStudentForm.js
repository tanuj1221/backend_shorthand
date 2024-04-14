import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditStudentForm = () => {
  const { id: studentId } = useParams();
  const [studentDetails, setStudentDetails] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    motherName: '',
    mobile_no: '',
    email: '',
    // Add other fields as necessary
  });
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    if (studentId) {
      axios.get(`http://localhost:3000/students/details/${studentId}`)
      .then(response => {
        console.log(response.data); // Check what you're getting here
        const studentData = response.data;
        setStudentDetails(studentData);
        setSelectedYear(studentData.batchYear);
        setSelectedSemester(studentData.semester);
        setSelectedSubjects(studentData.subjects.map(subject => subject.subjectId));
      })
      .catch(error => {
        console.error('Failed to fetch student data:', error);
      });
    }
  }, [studentId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3000/students/${studentId}`, studentDetails)
      .then(response => {
        alert('Student updated successfully!');
      })
      .catch(error => {
        console.error('Failed to update student:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={studentDetails.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={studentDetails.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Middle Name:
        <input
          type="text"
          name="middleName"
          value={studentDetails.middleName}
          onChange={handleChange}
        />
      </label>
      <label>
        Mother's Name:
        <input
          type="text"
          name="motherName"
          value={studentDetails.motherName}
          onChange={handleChange}
        />
      </label>
      <label>
        Mobile No:
        <input
          type="tel"
          name="mobile_no"
          value={studentDetails.mobile_no}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={studentDetails.email}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Student</button>
    </form>
  );
};

export default EditStudentForm;