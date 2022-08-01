import { fetchFromApi } from "./utils";

export const inputLabels = [
    "Age",
    "Income",
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
    "Private Hospital Cover",
    "Max Super Contributions",
];

export const resultLabels = [
    "Years To FIRE",
    // "Age At FIRE"
];

export const fireProcessor = async (formData) => {
    return await fetchFromApi("fire", formData);
};
