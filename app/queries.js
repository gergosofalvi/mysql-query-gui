const { databaseConnect } = require('./database-connect');
const Elements = require('../elements');
const logger = require('./logger');

const executeQuery = (query, req, res) => {
  const { username } = req.session;
  const queryNumber = req.url.split('/')[1];

  databaseConnect(query, function (err, result) {
    if (err) {
      logger(username, queryNumber, "Error: " + err.message);
      res.send(`
        <html>
          <body>
            <h1>Error</h1>
            <p>${err.message}</p>
          </body>
        </html>
      `);
    } else {
      logger(username, queryNumber, query + "Eredmény: \n" + JSON.stringify(result, null, 2));
      res.send(`
        <html>
          <body>
            <h1>Query Result</h1>
            <pre>${JSON.stringify(result, null, 2)}</pre>
            <a href="/">Vissza az első oldalra</a>
          </body>
        </html>
      `);
    }
  });
};

// Hozzáadjuk a query-ket az indexszel ellátott változókhoz
const queries = {};
Elements.forEach((item, index) => {
  const queryHandler = (req, res) => {
    const { variable_number, sql } = item;

    if (variable_number > 0) {
      // Itt a variable_number érték alapján kezeld a változókat, például:
      let queryString = sql;
      for (let i = 1; i <= variable_number; i++) {
        const variable = req.body[`v${i}`];
        const regex = new RegExp(`\\$v${i}`, 'g');
        queryString = queryString.replace(regex, variable);
      }

      executeQuery(queryString, req, res);
    } else {
      const query = req.body[`query${index + 1}`];
      const queryString = `${sql}'${query}'`;
      executeQuery(queryString, req, res);
    }
  };
  queries[`query${index + 1}`] = queryHandler;
});

module.exports = queries;
