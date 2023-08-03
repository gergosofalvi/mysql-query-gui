const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

const homePage = require('./app/homePage');
const queries = require('./app/queries');
const login = require('./login');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

// Express session middleware hozzáadása
app.use(session({
  secret: 'your-secret-key', // Titkos kulcs, amely alapján a session adatokat titkosítjuk
  resave: false,
  saveUninitialized: true,
}));

// Middleware for checking if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.loggedin) {
    next();
  } else {
    res.redirect('/login'); // If not logged in, redirect to the login page
  }
}

// Route for the home page, protected by the isLoggedIn middleware
app.get('/', isLoggedIn, (req, res) => {
  homePage(req, res);
});

// Login route handling
app.use(login);

// Query routes, protected by the isLoggedIn middleware
for (const queryName in queries) {
  app.post(`/${queryName}`, isLoggedIn, queries[queryName]);
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
