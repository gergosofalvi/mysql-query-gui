const fs = require('fs');

function logQuery(username, queryNumber, queryString) {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - Felhasználónév: ${username}, Query sorszáma: ${queryNumber}, SQL parancs: ${queryString}\n`;

  fs.appendFile('query_log.txt', logEntry, (err) => {
    if (err) {
      console.error('Hiba a log fájl írása közben:', err);
    }
  });
}

module.exports = logQuery;