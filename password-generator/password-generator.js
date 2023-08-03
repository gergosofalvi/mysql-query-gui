const bcrypt = require('bcryptjs');

// Véletlenszerű jelszó generálása
function generateRandomPassword(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

// A generált jelszó hashelése bcryptjs segítségével
function hashPassword(password) {
  return bcrypt.hashSync(password, 10); // A második paraméter a salt rounds, ami a hash erősségét határozza meg
}

// Példa: generáljunk egy 10 karakteres jelszót és hasheljük azt
const password = generateRandomPassword(10);
const hashedPassword = hashPassword(password);

console.log('Jelszó:', password);
console.log('Hashelt jelszó:', hashedPassword);