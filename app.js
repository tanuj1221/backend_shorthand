const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/studentRoutes')
const datainput = require('./routes/inputDataRoutes')
const subjectRoutes = require('./routes/subjectsroutes')
const app = express();
const PORT = 3000;

// Other app setup (body parser, session, etc.)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'divis@GeYT',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3000000 }
}));

// Use the auth routes
app.use(authRoutes);
app.use(studentRoutes);
app.use(datainput);
app.use(subjectRoutes)



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



