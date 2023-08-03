const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt');

// Bejelentkezési űrlap megjelenítése
router.get('/login', (req, res) => {
  res.send(`
  <html>
  <head>
    <title>Bejelentkezés</title>
    <!-- Bootstrap CSS betöltése -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
      body {
        background-color: #222;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
  
      .login-form {
        background-color: #333;
        border-radius: 8px;
        padding: 20px;
        width: 300px;
      }
  
      .login-form h1 {
        text-align: center;
        margin-bottom: 20px;
      }
  
      .form-control {
        background-color: #444;
        border: none;
        color: #fff;
      }
  
      .btn {
        background-color: #007bff;
        border: none;
        width: 100%;
      }
  
      .btn:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="login-form">
      <h1>Bejelentkezés</h1>
      <form method="post" action="/login">
        <div class="form-group">
          <label for="username">Felhasználónév:</label>
          <input type="text" class="form-control" id="username" name="username" required autocomplete="on">
        </div>
        <div class="form-group">
          <label for="password">Jelszó:</label>
          <input type="password" class="form-control" id="password" name="password" required autocomplete="on">
        </div>
        <button type="submit" class="btn">Bejelentkezés</button>
      </form>
    </div>
  </body>
  </html>
  
  `);
});

// Bejelentkezési adatok ellenőrzése
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const usersData = JSON.parse(fs.readFileSync('users.json'));
  
    // Ellenőrizd, hogy a felhasználónév létezik-e
    const user = usersData.users.find(u => u.username === username);
    if (!user) {
      return res.send('<h1>Hibás felhasználónév vagy jelszó!</h1>');
    }
  
    // Ellenőrizd a jelszó helyességét bcrypt segítségével
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.send('<h1>Hibás felhasználónév vagy jelszó!</h1>');
      }
  
      // Bejelentkezés sikeres, beállítjuk a session.loggedin értékét true-ra
      req.session.loggedin = true;
      req.session.username = username; // Mentjük a felhasználónevet a session-be
      res.redirect('/'); // Átirányítjuk a felhasználót a homePage-re
    });
  });
  

module.exports = router;
