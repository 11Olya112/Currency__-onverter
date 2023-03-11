import React, { useEffect, useState } from 'react';
import './Main.scss';

type Currency = 'USD' | 'EUR' | 'UAH';

interface ExchangeRate {
  rates: {
    [key: string]: number;
  }
}

const getCurrencyCode = (currency: Currency): string => {
  switch (currency) {
    case 'USD':
      return 'USD';
    case 'EUR':
      return 'EUR';
    case 'UAH':
      return 'UAH';
    default:
      return '';
  }
};

export const Main: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [toCurrency, setToCurrency] = useState<Currency>('UAH');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const API_URL = 'https://openexchangerates.org/api/latest.json?app_id=7ecd5129702c4f00896f0738196fdfff';

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: ExchangeRate) => {
        const fromCurrencyRate = data.rates[getCurrencyCode(fromCurrency)];
        const toCurrencyRate = data.rates[getCurrencyCode(toCurrency)];

        if (fromCurrencyRate && toCurrencyRate) {
          setExchangeRate(toCurrencyRate / fromCurrencyRate);
        }
      })
      .catch(error => error);
  }, [fromCurrency, toCurrency]);

  const handleFromCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFromCurrency(event.target.value as Currency);
  };

  const handleToCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setToCurrency(event.target.value as Currency);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  useEffect(() => {
    setConvertedAmount(amount * exchangeRate);
  }, [amount, exchangeRate]);

  return (
    <div className="main">
      <h4>Conversion</h4>
      <div className="main__form">
        <label htmlFor="initial">
          Enter the desired quantity:
          <br />
          <input
            type="number"
            id="initial"
            name="initial"
            value={amount}
            min="0"
            onChange={handleAmountChange}
            className="input"
          />
        </label>
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          className="select"
        >
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <br />
        <label htmlFor="initial">
          Result:
          <br />
          <input
            type="number"
            id="final"
            value={convertedAmount.toFixed(2)}
            readOnly
            className="input"
          />
        </label>
        <select
          name="final"
          id="final"
          value={toCurrency}
          onChange={handleToCurrencyChange}
          className="select"
        >
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
    </div>
  );
};
