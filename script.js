// Obtener el contenedor de cuentas
const accountContainer = document.getElementById('account-container');



// Función para mostrar los detalles de la cuenta
function showAccountDetails(account) {
  const saldo = account.saldo;
  const tipoCuenta = account.tipo_letras;
  const numeroCuenta = account.n;


  // Mostrar los detalles en pantalla
  const titleElement = document.getElementById('title');
  titleElement.textContent = `Este es Tu saldo Actual:`;

  const saldoElement = document.getElementById('saldo');
  saldoElement.textContent = `Saldo de la Cuenta: ${saldo}`;

  const tipoCuentaElement = document.getElementById('tipo-cuenta');
  tipoCuentaElement.textContent = `Tipo de Cuenta: ${getAccountType(tipoCuenta)}`;

  const numeroCuentaElement = document.getElementById('numero-cuenta');
  numeroCuentaElement.textContent = `Número de Cuenta: ${getAccountNumber(numeroCuenta)}`;



  // Ocultar contenedor de cuentas y mostrar contenedor de detalles
  const container1 = document.querySelector('.container1');
  const container2 = document.querySelector('.container2');
  container1.style.display = 'none';
  container2.style.display = 'block';
}


// Función para obtener el tipo de cuenta
function getAccountType(accountType) {
  if (accountType.toUpperCase() === 'CC') {
    return 'Cuenta corriente';
  } else if (accountType.toUpperCase() === 'CA') {
    return 'Caja de Ahorros';
  } else {
    return accountType;
  }
}


// Función para obtener el número de cuenta
function getAccountNumber(accountNumber) {
  return accountNumber ? `Nro: ${accountNumber}` : 'N/A';
}


// Función para generar los recuadros de las cuentas
function generateAccountBoxes(accounts) {
  const maxBoxesPerPage = 6;
  let currentPage = 0;

  function showPage(page) {
    // Limpiar el contenedor de cuentas
    accountContainer.innerHTML = '';

    const startIndex = page * maxBoxesPerPage;
    const endIndex = startIndex + maxBoxesPerPage;

    const pageAccounts = accounts.slice(startIndex, endIndex);

    pageAccounts.forEach((account, index) => {
      const accountType = account.tipo_letras;
      const accountNumber = account.n;

      // Filtrar cuentas de tipo CA y CC
      if (accountType.toUpperCase() === 'CC' || accountType.toUpperCase() === 'CA') {
        const box = document.createElement('div');
        box.classList.add('account-box');
        box.dataset.account = JSON.stringify(account);
        box.addEventListener('click', () => showAccountDetails(account));

        const p1 = document.createElement('p');
        p1.textContent = getAccountType(accountType);

        const p2 = document.createElement('p');
        p2.textContent = getAccountNumber(accountNumber);

        box.appendChild(p1);
        box.appendChild(p2);
        accountContainer.appendChild(box);
      }
    });


    // Agregar botón "Anterior" al inicio del contenedor de cuentas si no es la primera página
    if (currentPage > 0) {
      const prevButton = document.createElement('div');
      prevButton.classList.add('account-box');
      prevButton.textContent = '<< Opciones anteriores';
      prevButton.addEventListener('click', () => {
        currentPage--;
        showPage(currentPage);
      });
      accountContainer.prepend(prevButton);
    }

    // Agregar botón "Siguiente" al final del contenedor de cuentas si no es la última página
    if (currentPage < Math.ceil(accounts.length / maxBoxesPerPage) - 1) {
      const nextButton = document.createElement('div');
      nextButton.classList.add('account-box');
      nextButton.textContent = 'Más opciones >>';
      nextButton.addEventListener('click', () => {
        currentPage++;
        showPage(currentPage);
      });

      // Reemplazar la última caja por el botón "Siguiente"
      const lastBox = accountContainer.lastChild;
      accountContainer.replaceChild(nextButton, lastBox);
    }
  }

  showPage(currentPage);
}

// Obtener los datos de la API
async function fetchAccounts() {
  try {
    const response = await fetch('https://api.npoint.io/97d89162575a9d816661');
    const data = await response.json();
    const accounts = data.cuentas;
    generateAccountBoxes(accounts);
  } catch (error) {
    console.log('Error al obtener los datos de la cuenta:', error);
  }
}

fetchAccounts();

// Obtener el botón "Salir"
const salirButton = document.getElementById('salir');

// Función para limpiar la pantalla y recargar la página
function limpiarPantalla() {
  // Mostrar contenedor 1 y ocultar contenedor 2
  const container1 = document.querySelector('.container1');
  const container2 = document.querySelector('.container2');
  container1.style.display = 'block';
  container2.style.display = 'none';
}
// Agregar evento clic al botón "Salir"
salirButton.addEventListener('click', limpiarPantalla);