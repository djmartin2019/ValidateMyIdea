"use client";
import { useState } from "react";
import {
  calculateProfit,
  CalculationResults,
  CalculationInputs,
} from "./utils/calculations";

export default function Home() {
  const [result, setResult] = useState<CalculationResults | null>(null);

  const handleValidate = () => {
    const keywordEstimate = document.getElementById(
      "keyword-estimate"
    ) as HTMLInputElement | null;
    const lowConversionRate = document.getElementById(
      "low-conversion-rate"
    ) as HTMLInputElement | null;
    const highConversionRate = document.getElementById(
      "high-conversion-rate"
    ) as HTMLInputElement | null;
    const saleType = document.getElementById(
      "sale-type"
    ) as HTMLSelectElement | null;
    const pricePerUnit = document.getElementById(
      "price-per-unit"
    ) as HTMLInputElement | null;
    const costType = document.getElementById(
      "cost-type"
    ) as HTMLSelectElement | null;
    const operationalCost = document.getElementById(
      "operational-cost"
    ) as HTMLInputElement | null;

    if (
      keywordEstimate &&
      lowConversionRate &&
      highConversionRate &&
      saleType &&
      pricePerUnit &&
      costType &&
      operationalCost
    ) {
      const inputs: CalculationInputs = {
        keywordEstimate: keywordEstimate.value,
        lowConversionRate: lowConversionRate.value,
        highConversionRate: highConversionRate.value,
        saleType: saleType.value,
        pricePerUnit: pricePerUnit.value,
        costType: costType.value,
        operationalCost: operationalCost.value,
      };

      const results = calculateProfit(inputs);
      setResult(results);
      console.log(results);
    } else {
      console.error("One or more elements are null");
    }
  };

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-sky-950 text-white md:p-10">
      <div className="text-center w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 md:text-4xl md:mb-10">
          Validate My Idea
        </h1>
        <div className="p-4 border-white border-2 rounded-lg bg-sky-800 md:p-6">
          <div className="p-2 mb-4 md:p-3 md:m-2">
            <label className="block pb-1 text-lg">Google Trend (%)</label>
            <input
              type="number"
              className="w-full text-black p-2 rounded-md"
              placeholder="Annual Google Trend Percentage"
              id="google-trend"
            />
          </div>
          <div className="p-2 mb-4 md:p-3 md:m-2">
            <label className="block pb-1 text-lg">
              Google Keyword Estimate
            </label>
            <input
              type="number"
              className="w-full text-black p-2 rounded-md"
              placeholder="Monthly Keyword Estimate"
              id="keyword-estimate"
            />
          </div>
          <div className="p-2 mb-4 md:p-3 md:m-2">
            <label className="block pb-1 text-lg">Conversion Rates (%)</label>
            <input
              type="number"
              className="w-full text-black p-2 rounded-md mb-2"
              placeholder="Low (e.g., 1%)"
              id="low-conversion-rate"
            />
            <input
              type="number"
              className="w-full text-black p-2 rounded-md"
              placeholder="High (e.g., 5%)"
              id="high-conversion-rate"
            />
          </div>
          <div className="p-2 mb-4 md:p-3 md:m-2">
            <label className="block pb-1 text-lg">Revenue Model</label>
            <select
              className="w-full text-black p-2 rounded-md mb-2"
              id="sale-type"
            >
              <option value="monthly">Monthly Subscription</option>
              <option value="one-time">One-Time Purchase</option>
            </select>
            <input
              type="number"
              className="w-full text-black p-2 rounded-md"
              placeholder="Price per User/Item"
              id="price-per-unit"
            />
          </div>
          <div className="p-2 mb-4 md:p-3 md:m-2">
            <label className="block pb-1 text-lg">Cost Structure</label>
            <select
              className="w-full text-black p-2 rounded-md mb-2"
              id="cost-type"
            >
              <option value="cost-per">Cost per User/Item</option>
              <option value="annual-costs">Annual Operational Costs</option>
            </select>
            <input
              type="number"
              className="w-full text-black p-2 rounded-md"
              placeholder="Estimated Cost"
              id="operational-cost"
            />
          </div>
          <div>
            <button
              className="p-3 w-full bg-sky-500 rounded-md hover:bg-sky-600"
              onClick={handleValidate}
            >
              Validate!
            </button>
          </div>
          {result && (
            <div className="mt-5">
              <p
                className={`text-lg ${
                  result.annualProfitLow >= 1000000
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Annual Profit (Low): {formatNumber(result.annualProfitLow)}
              </p>
              <p
                className={`text-lg ${
                  result.annualProfitHigh >= 1000000
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Annual Profit (High): {formatNumber(result.annualProfitHigh)}
              </p>
              <p
                className={`text-lg ${
                  result.isProfitableLow ? "text-green-500" : "text-red-500"
                }`}
              >
                Is Profitable (Low): {result.isProfitableLow ? "Yes" : "No"}
              </p>
              <p
                className={`text-lg ${
                  result.isProfitableHigh ? "text-green-500" : "text-red-500"
                }`}
              >
                Is Profitable (High): {result.isProfitableHigh ? "Yes" : "No"}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
