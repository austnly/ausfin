import { fetchFromApi } from "./utils";

export const inputLabels = ["Income", "Rate"];

export const checkBoxLabels = ["Super Inclusive", "Max Super Contributions"];

export const resultLabels = [
    "Super Contribution",
    "Reportable Contributions",
    "Income After Super",
];

export const superProcessor = async (formData) => {
    // const income = Number(formData.get("taxableIncome"));
    // const inclusive = Boolean(formData.get("superInclusive"));
    // const rate = Number(formData.get("contributionRate"));
    // const max = Boolean(formData.get("maximiseContributions"));
    // console.log(
    //     "Income: ",
    //     income,
    //     "Inclusive: ",
    //     inclusive,
    //     "Rate: ",
    //     rate,
    //     "Max: ",
    //     max,
    // );
    // return superCalc({
    //     income: income,
    //     superInclusive: inclusive,
    //     rate: rate,
    //     maxSuperContributions: max,
    // });
    return await fetchFromApi("super", formData);
};
