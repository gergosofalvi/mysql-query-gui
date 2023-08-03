// scripts.js

 // Dark mode kapcsoló kezelése
 function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Az összes accordion bezárása
function closeAllAccordions() {
  const accordions = document.querySelectorAll('.accordion-item');
  accordions.forEach(accordion => {
    accordion.classList.remove('show');
  });
}

// Az összes accordion bezárása induláskor
function closeAllAccordionsOnLoad() {
  const accordions = document.querySelectorAll('.accordion-item');
  accordions.forEach(accordion => {
    accordion.classList.remove('show');
  });
}

// Az összes accordion bezárása induláskor
closeAllAccordionsOnLoad();

// Felülírjuk a Bootstrap által kezelt .show osztályt, hogy a saját stílusunk érvényesüljön
document.querySelectorAll('.accordion-header').forEach(accordionHeader => {
  accordionHeader.addEventListener('click', function() {
    const accordionItem = this.closest('.accordion-item');
    if (accordionItem.classList.contains('show')) {
      accordionItem.classList.remove('show');
    } else {
      closeAllAccordions(); // Az összes többi accordion bezárása
      accordionItem.classList.add('show');
    }
  });
});
// Felugró ablak megjelenítése a gombra kattintáskor
function showConfirmationPopup(title) {
  const isConfirmed = confirm('Biztosan futtatni szeretnéd ezt a query-t: ' + title + '?');
  return isConfirmed;
}

// Felülírjuk a form küldés eseményt
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function (event) {
    const button = form.querySelector('button[type="submit"]');
    const title = button.textContent.trim().replace('Run', '');
    if (!showConfirmationPopup(title)) {
      event.preventDefault(); // Megakadályozzuk a form elküldését, ha a felhasználó nem erősítette meg
    }
  });
});