import { fetchFromApi } from "./utils";

export const inputLabels = ["Income"];

export const checkBoxLabels = [];

export const resultLabels = ["Base Tax", "Tax Rate", "Total Tax", "After Tax"];

export const taxProcessor = async (formData) => {
    return await fetchFromApi("tax", formData);
};
