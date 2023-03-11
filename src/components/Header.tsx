import React, { useEffect, useState } from 'react';
import './Header.scss';

interface ExchangeRate {
  currencyCodeA: number;
  currencyCodeB: number;
  rateBuy: number;
  rateSell: number;
  date: number;
}

interface ExchangeRates {
  USD: number;
  EUR: number;
}

export const Header: React.FC = () => {
  const [rates, setRates] = useState<ExchangeRates>({ USD: 0, EUR: 0 });

  useEffect(() => {
    fetch('https://api.monobank.ua/bank/currency')
      .then((response) => response.json())
      .then((data: ExchangeRate[]) => {
        const usdRate = data.find((item) => item
          .currencyCodeA === 840 && item.currencyCodeB === 980);
        const eurRate = data.find((item) => item
          .currencyCodeA === 978 && item.currencyCodeB === 980);

        if (usdRate && eurRate) {
          setRates({ USD: usdRate.rateBuy, EUR: eurRate.rateBuy });
        }
      })
      .catch(error => error);
  }, []);

  return (
    <div className="header">
      <h1>Current exchange rate</h1>
      <p>
        1 USD =
        {rates.USD.toFixed(2)}
        UAH
      </p>
      <p>
        1 EUR =
        {rates.EUR.toFixed(2)}
        UAH
      </p>
    </div>
  );
};
