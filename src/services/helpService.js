import { totalHELP } from "./calcTS-mod";
import { fetchFromApi } from "./utils";

export const inputLabels = [
    "Income",
    "Reportable Super Contributions",
    "Reportable Fringe Benefits",
];

export const checkBoxLabels = [];

export const resultLabels = ["HELP Repayment Rate", "HELP Repayment"];

export const helpProcessor = async (formData) => {
    // const income = Number(formData.get("taxableIncome"));
    // const rSuper = Number(formData.get("reportableSuperContributions"));
    // const rFbt = Number(formData.get("reportableFringeBenefits"));
    // console.log("Income: ", income, "FBT: ", rFbt, "Super: ", rSuper);
    // return totalHELP(income + rFbt + rSuper);
    return await fetchFromApi("help-repay", formData);
};
