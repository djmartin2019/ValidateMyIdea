export interface CalculationInputs {
  keywordEstimate: string;
  lowConversionRate: string;
  highConversionRate: string;
  saleType: string;
  pricePerUnit: string;
  costType: string;
  operationalCost: string;
}

export interface CalculationResults {
  annualProfitLow: number;
  annualProfitHigh: number;
  isProfitableLow: boolean;
  isProfitableHigh: boolean;
}

export function calculateProfit(inputs: CalculationInputs): CalculationResults {
  const {
    keywordEstimate,
    lowConversionRate,
    highConversionRate,
    saleType,
    pricePerUnit,
    costType,
    operationalCost,
  } = inputs;

  const monthlySearches = Number(keywordEstimate);
  const annualSearches = monthlySearches * 12;

  const lowRate = Number(lowConversionRate) / 100;
  const highRate = Number(highConversionRate) / 100;

  const estimatedUsersLow = annualSearches * lowRate;
  const estimatedUsersHigh = annualSearches * highRate;

  let annualRevenueLow: number;
  let annualRevenueHigh: number;

  if (saleType === "monthly") {
    annualRevenueLow = estimatedUsersLow * (Number(pricePerUnit) * 12);
    annualRevenueHigh = estimatedUsersHigh * (Number(pricePerUnit) * 12);
  } else {
    annualRevenueLow = estimatedUsersLow * Number(pricePerUnit);
    annualRevenueHigh = estimatedUsersHigh * Number(pricePerUnit);
  }

  let totalCostLow: number;
  let totalCostHigh: number;

  if (costType === "cost-per") {
    totalCostLow = estimatedUsersLow * Number(operationalCost);
    totalCostHigh = estimatedUsersHigh * Number(operationalCost);
  } else {
    totalCostLow = Number(operationalCost);
    totalCostHigh = Number(operationalCost);
  }

  const annualProfitLow = annualRevenueLow - totalCostLow;
  const annualProfitHigh = annualRevenueHigh - totalCostHigh;

  const isProfitableLow = annualProfitLow >= 1000000;
  const isProfitableHigh = annualProfitHigh >= 1000000;

  return {
    annualProfitLow,
    annualProfitHigh,
    isProfitableLow,
    isProfitableHigh,
  };
}
