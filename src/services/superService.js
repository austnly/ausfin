import { fetchFromApi } from "./utils";

export const inputLabels = ["Income", "Rate"];

export const checkBoxLabels = ["Super Inclusive", "Max Super Contributions"];

export const resultLabels = [
    "Super Contribution",
    "Reportable Contributions",
    "Income After Super",
];

export const superProcessor = async (formData) => {
    return await fetchFromApi("super", formData);
};
