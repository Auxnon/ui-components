interface CurrencyOptions {
  significantDigits?: number;
  thousandsSeparator?: string;
  decimalSeparator?: string;
  symbol?: string;
}

const defaultOptions = {
  significantDigits: 2,
  thousandsSeparator: ",",
  decimalSeparator: ".",
  symbol: "$",
};

const currencyFormatter = (value: number, options: CurrencyOptions) => {
  options = { ...defaultOptions, ...options };
  const valueStr = value.toFixed(options.significantDigits);

  const [currency, decimal] = valueStr.split(".");
  return `${options.symbol} ${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options?.thousandsSeparator || defaultOptions.thousandsSeparator
  )}${options.decimalSeparator}${decimal}`;
};

export const Cost = (props: { currency?: string; amount?: number }) => {
  const currency = props.currency || "$";
  const amount = props.amount || 100000.0;

  return (
    <div className="ui-shop-price text-left text-lg font-bold mx-3">
      <span className="ui-shop-price-amount">
        {currencyFormatter(amount, { symbol: currency })}
      </span>
    </div>
  );
};
