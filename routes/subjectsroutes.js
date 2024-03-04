const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const subjectController = require('../controllers/subjects')


router.get('/subjectsAndIds', isAuthenticated, subjectController.getSubjectIds);

module.exports = router;