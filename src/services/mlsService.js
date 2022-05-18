import { totalMLS } from "./calcTS-mod";

export const inputLabels = ["Taxable Income", "Reportable Fringe Benefits"];

export const checkBoxLabels = [];

export const resultLabels = ["MLS Rate", "Medicare Levy Surcharge"];

export const mlsProcessor = (formData) => {
    const income = Number(formData.get("taxableIncome"));
    const rFbt = Number(formData.get("reportableFringeBenefits"));
    console.log("Income: ", income, "FBT: ", rFbt);
    return totalMLS(income + rFbt);
};
