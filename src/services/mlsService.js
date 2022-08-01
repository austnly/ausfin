import { fetchFromApi } from "./utils";

export const inputLabels = ["Income", "Reportable Fringe Benefits"];

export const checkBoxLabels = [];

export const resultLabels = ["MLS Rate", "Medicare Levy Surcharge"];

export const mlsProcessor = async (formData) => {
    // const income = Number(formData.get("taxableIncome"));
    // const rFbt = Number(formData.get("reportableFringeBenefits"));
    // const body = {
    //     income: income + rFbt,
    // };
    // const newForm = new FormData(body);
    // console.log("Income: ", income, "FBT: ", rFbt);
    // return totalMLS(income + rFbt);
    return await fetchFromApi("mls", formData);
};
