import { fetchFromApi, flattenResult } from "./utils";

export const inputLabels = [
    "Gross Income",
    "Expenses",
    "Super Contribution Rate",
    "Deductions",
    "Fringe Benefits",
    "HELP Balance",
    "Super Balance",
    "Investments Balance",
    "Assumed Growth",
];

export const checkBoxLabels = [
    "Super Inclusive",
    "Max Super Contributions",
    "Private Hospital Cover",
];

export const resultLabels = [
    "Super Contribution",
    "Reportable Contributions",
    "Medicare Levy",
    "Medicare Levy Surcharge",
    "HELP Repayment",
    "Base Tax",
    "Total Tax",
    "Net Income",
    "Available To Invest",
    "HELP Balance",
    "Super Balance",
    "Investments Balance",
    "Tax Rate",
    "MLS Rate",
    "HELP Repayment Rate",
];

export const formProcessor = async (formData) => {
    // result has nested objects
    const nestedResult = await fetchFromApi("detailed-tax", formData);

    return flattenResult(nestedResult);
};
