import { fetchFromApi } from "./utils";

export const inputLabels = [
    "Income",
    "Reportable Super Contributions",
    "Reportable Fringe Benefits",
];

export const checkBoxLabels = [];

export const resultLabels = ["HELP Repayment Rate", "HELP Repayment"];

export const helpProcessor = async (formData) => {
    return await fetchFromApi("help-repay", formData);
};
