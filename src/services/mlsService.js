import { fetchFromApi } from "./utils";

export const inputLabels = ["Income", "Reportable Fringe Benefits"];

export const checkBoxLabels = [];

export const resultLabels = ["MLS Rate", "Medicare Levy Surcharge"];

export const mlsProcessor = async (formData) => {
    return await fetchFromApi("mls", formData);
};
