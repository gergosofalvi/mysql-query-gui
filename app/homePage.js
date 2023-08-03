const Elements = require('../elements');
const fs = require('fs');
const path = require('path');

const homePage = (req, res) => {
  const accordionHtml = Elements.map((item, index) => accordionItem(item.id, item.title, item.description, item.variable_number, index + 1)).join('\n');

  const scriptsPath = path.join(__dirname, '../public/scripts.js');
  const scripts = fs.readFileSync(scriptsPath, 'utf-8');

  res.send(`
  <html>
    <head>
      <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
      <link rel="stylesheet" href="styles.css">
    </head>
    <body class="dark-mode">
      <div class="container">
        ${accordionHtml}
      </div>

      <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
      <script>
        ${scripts}
      </script>
    </body>
  </html>
`);
}

function accordionItem(id, title, description, variableNumber, index) {
  let inputFields = '';
  const labels = Elements[index - 1].labels || []; // Ellenőrizzük, hogy van-e labels tulajdonság, ha nincs, akkor üres tömb
  for (let i = 0; i < variableNumber; i++) {
    const label = labels[i] || ''; // Ellenőrizzük, hogy az adott indexű label létezik-e, ha nem, akkor üres string
    inputFields += `
      <div class="input-container">
        <label for="v${i + 1}">${label}</label>
        <input type="text" name="v${i + 1}" required>
      </div>
    `;
  }

  return `
    <div class="accordion-item">
      <div class="accordion-header" onclick="toggleAccordion('${id}')">
        <h1>${index}. ${title}</h1>
      </div>
      <div id="${id}" class="accordion-body">
        <h2>Leírás:</h2>
        <h3>${description}</h3>
        <form method="post" action="/${id}">
          ${inputFields}
          <br>
          <button type="submit" >Run ${title}</button>
        </form>
      </div>
    </div>
  `;
}

module.exports = homePage;
