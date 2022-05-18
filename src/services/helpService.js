import { totalHELP } from "./calcTS-mod";

export const inputLabels = [
    "Taxable Income",
    "Reportable Super Contributions",
    "Reportable Fringe Benefits",
];

export const checkBoxLabels = [];

export const resultLabels = ["HELP Repayment Rate", "HELP Repayment"];

export const helpProcessor = (formData) => {
    const income = Number(formData.get("taxableIncome"));
    const rSuper = Number(formData.get("reportableSuperContributions"));
    const rFbt = Number(formData.get("reportableFringeBenefits"));
    console.log("Income: ", income, "FBT: ", rFbt, "Super: ", rSuper);
    return totalHELP(income + rFbt + rSuper);
};
