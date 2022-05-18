import { superCalc } from "./calcTS-mod";

export const inputLabels = ["Taxable Income", "Contribution Rate"];

export const checkBoxLabels = ["Super Inclusive", "Maximise Contributions"];

export const resultLabels = [
    "Super Contribution",
    "Reportable Contributions",
    "Income After Super",
];

export const superProcessor = (formData) => {
    const income = Number(formData.get("taxableIncome"));
    const inclusive = Boolean(formData.get("superInclusive"));
    const rate = Number(formData.get("contributionRate"));
    const max = Boolean(formData.get("maximiseContributions"));
    console.log(
        "Income: ",
        income,
        "Inclusive: ",
        inclusive,
        "Rate: ",
        rate,
        "Max: ",
        max,
    );
    return superCalc({
        income: income,
        superInclusive: inclusive,
        rate: rate,
        maxSuperContributions: max,
    });
};
