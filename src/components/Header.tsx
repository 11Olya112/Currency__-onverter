import React, { useEffect, useState } from 'react';
import './Header.scss';

interface ExchangeRates {
  USD: number;
  EUR: number;
}

interface ExchangeRate {
  cc: string;
  rate: number;
}

export const Header: React.FC = () => {
  const [rates, setRates] = useState<ExchangeRates>({ USD: 0, EUR: 0 });

  useEffect(() => {
    const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const usdRate: number = data.find((rate: ExchangeRate) => rate.cc === 'USD').rate;
        const eurRate: number = data.find((rate: ExchangeRate) => rate.cc === 'EUR').rate;

        setRates({ USD: usdRate, EUR: eurRate });
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
