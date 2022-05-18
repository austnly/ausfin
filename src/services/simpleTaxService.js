import { taxCalc } from "./calcTS-mod";

export const inputLabels = ["Taxable Income"];

export const checkBoxLabels = [];

export const resultLabels = ["Base Tax", "Tax Rate", "Total Tax", "After Tax"];

export const taxProcessor = (formData) => {
    const income = Number(formData.get("taxableIncome"));
    console.log("Income: ", income);
    return taxCalc(income);
};
