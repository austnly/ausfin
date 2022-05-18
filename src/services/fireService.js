import { IncomeTaxProfile, NetWorth, taxTime, timeToFIRE } from "./calcTS-mod";

export const inputLabels = [
    "Age",
    "Gross Income",
    "Expenses",
    "Super Contribution Rate",
    "Deductions",
    "Fringe Benefits",
    "HELP Balance",
    "Super Balance",
    "Investments Balance",
    "Assumed Growth",
];

export const checkBoxLabels = ["Super Inclusive", "Private Hospital Cover"];

export const resultLabels = ["Years To FIRE", "Age At FIRE"];

export const fireProcessor = (formData) => {
    let formDataVals = {};
    for (const [key, value] of formData.entries()) {
        formDataVals[key] =
            Number(value) || value === "0" ? Number(value) : value;
    }
    console.log("Form Data:", formDataVals);

    const netWorth = new NetWorth(
        formDataVals.grossIncome,
        formDataVals.helpBalance,
        formDataVals.superBalance,
        formDataVals.investmentsBalance,
    );
    console.log(netWorth);
    const incomeTaxProfile = new IncomeTaxProfile(
        netWorth,
        formDataVals.expenses,
        Boolean(formDataVals.superInclusive),
        formDataVals.superContributionRate,
        formDataVals.deductions,
        formDataVals.fringeBenefits,
        Boolean(formDataVals.privateHospitalCover),
    );
    console.log(incomeTaxProfile);
    return timeToFIRE(incomeTaxProfile, formDataVals.age, formDataVals.growth);
};
