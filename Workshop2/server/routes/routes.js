const express = require('express');
const router = express.Router();

// Endpoints

// Get the exchange data in USD and EUR based on the currency type.
router.get('/tipocambio', async (req, res) => {
    try {
        let currencyType = req.query.currency.toLowerCase();

        const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyType}.json`);
        const data = await response.json();

        const exchangeRates = {
            currency: currencyType,
            exchangeRateUSD: data[Object.keys(data)[1]].usd,
            exchangeRateEUR: data[Object.keys(data)[1]].eur
        }
        res.json(exchangeRates);
    }
    catch (error) {
        console.error('Error al solicitar la tipo de cambio:', error);
        res.status(400).json({ message: error.message });
    }
});

// Get all countries and related information
router.get('/paises', async (req, res) => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        const allCountries = data.map(country => ({
            name: country.name.common,
            currency: country.currencies ? Object.keys(country.currencies)[0] : null
        }));

        res.json(allCountries);
    } catch (error) {
        console.error('Error al solicitar la información de los países:', error);
        res.status(400).json({ message: error.message });
    }
});

// Export this module
module.exports = router;