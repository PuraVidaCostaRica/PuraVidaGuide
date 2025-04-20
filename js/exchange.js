
const API_KEY = process.env.EXCHANGE_RATE_API_KEY; //  ключ от ExchangeRate-API
let exchangeRates = {};
let lastUpdate = '';

// Элементы интерфейса
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertButton = document.getElementById('convertButton');
const convertText = document.getElementById('convertText');
const convertLoader = document.getElementById('convertLoader');
const resultDiv = document.getElementById('result');
const conversionResult = document.getElementById('conversionResult');
const inverseResult = document.getElementById('inverseResult');
const updateStatus = document.getElementById('updateStatus');

// Получение текущих курсов валют
async function fetchExchangeRates() {
try {
 updateStatus.innerHTML = 'Loading current rates... <span class="loading"></span>';
 convertLoader.style.display = 'inline-block';
 convertText.textContent = 'Loading...';
 convertButton.disabled = true;

 const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
 const data = await response.json();

 if (data.result === 'success') {
   exchangeRates = data.conversion_rates;
   lastUpdate = new Date(data.time_last_update_utc);

   // Добавляем CRC (если его нет в API) и CAD (если нет)
   if (!exchangeRates.CRC) {
     exchangeRates.CRC = 550; // Примерное значение
   }
   if (!exchangeRates.CAD) {
     exchangeRates.CAD = 1.25; // Примерное значение для канадского доллара
   }

   updateStatus.textContent = `Rates updated: ${lastUpdate.toLocaleString()}`;
   convertButton.disabled = false;
   convertText.textContent = 'Convert';
   convertLoader.style.display = 'none';
   convertCurrency(); // Автоматическое обновление конверсии
 } else {
   throw new Error(data['error-type']);
 }
} catch (error) {
 console.error('Error fetching exchange rates:', error);
 updateStatus.innerHTML = `Could not load live rates. Using default values. <button onclick="fetchExchangeRates()">Retry</button>`;

 // Резервные значения курсов (включая CAD)
 exchangeRates = {
   USD: 1,
   EUR: 0.85,
   GBP: 0.73,
   CAD: 1.25,
   CRC: 550
 };
 lastUpdate = new Date();
 convertText.textContent = 'Convert';
 convertLoader.style.display = 'none';
 convertButton.disabled = false;
}
}

// Конвертация валют
function convertCurrency() {
const amount = parseFloat(amountInput.value);
const fromCurrency = fromCurrencySelect.value;
const toCurrency = toCurrencySelect.value;

// Исправленная проверка (добавлена закрывающая скобка)
if (isNaN(amount)) {
 alert("Please enter a valid amount");
 return;
}

// Проверка наличия курсов валют
if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
 alert("Currency data not available. Please try again later.");
 return;
}

// Конвертация через USD как базовую валюту
const amountInUSD = amount / exchangeRates[fromCurrency];
const convertedAmount = amountInUSD * exchangeRates[toCurrency];

// Форматирование результата
const formatCurrency = (value, currency) => {
 return new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: currency,
   minimumFractionDigits: 2,
   maximumFractionDigits: 2
 }).format(value).replace(currency, getCurrencySymbol(currency));
};

// Отображение результата
conversionResult.innerHTML = `
 <strong>${formatCurrency(amount, fromCurrency)} = 
 ${formatCurrency(convertedAmount, toCurrency)}</strong>
`;

// Обратный курс
const inverseRate = (1 / exchangeRates[toCurrency]) * exchangeRates[fromCurrency];
inverseResult.textContent = `1 ${toCurrency} = ${inverseRate.toFixed(4)} ${fromCurrency}`;

resultDiv.style.display = "block";
}

// Символы валют (добавлен CAD)
function getCurrencySymbol(currency) {
const symbols = {
 USD: '$',
 EUR: '€',
 GBP: '£',
 CAD: 'CA$',
 CRC: '₡'
};
return symbols[currency] || currency;
}

// Обработчики событий
convertButton.addEventListener('click', convertCurrency);
fromCurrencySelect.addEventListener('change', convertCurrency);
toCurrencySelect.addEventListener('change', convertCurrency);
amountInput.addEventListener('input', convertCurrency);

// Инициализация
convertButton.disabled = true;
fetchExchangeRates();
