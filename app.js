const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS module
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/studentRoutes');
const datainput = require('./routes/inputDataRoutes');
const subjectRoutes = require('./routes/subjectsroutes');
const app = express();
const PORT = 3000;

// Enable CORS with default options (accept requests from any origin)
app.use(cors());

// Alternatively, to customize CORS for specific origins, methods, etc.:
// app.use(cors({
//   origin: 'http://example.com', // Specify the origin(s) you want to allow
//   methods: ['GET', 'POST'], // Allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//   credentials: true, // To allow cookies to be sent across origins
// }));

// Other app setup (body parser, session, etc.)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'divis@GeYT',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3000000 }
}));

// Use the routes
app.use(authRoutes);
app.use(studentRoutes);
app.use(datainput);
app.use(subjectRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
