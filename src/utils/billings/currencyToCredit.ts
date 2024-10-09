/**
 * Convert an amount in a given currency to credit units
 *
 * @param amount - The amount to convert
 * @param currency - The currency of the amount
 *
 * @returns The amount in credit units
 */
export const convertCurrencyToCreditUnits = (
  amount: number,
  currency: string,
): number => {
  const conversionRates: { [key: string]: number } = {
    USD: 1, // 1 USD = 1 credit unit
    EUR: 1.2, // 1 EUR = 1.2 USD
    XOF: 0.0015, // 1 XOF = 0.0015 USD
  };

  // If the currency is accepted, apply the conversion rate and round the result to the nearest whole number
  if (conversionRates[currency]) {
    return Math.round(amount * conversionRates[currency]);
  }

  // If currency is not in the list, return the original amount in credits (assumed 1:1 with USD)
  return Math.round(amount);
};
