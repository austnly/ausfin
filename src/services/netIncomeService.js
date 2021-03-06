import { IncomeTaxProfile, NetWorth, taxTime } from "./calcTS-mod";

export const inputLabels = [
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

export const checkBoxLabels = [
    "Super Inclusive",
    "Max Super Contributions",
    "Private Hospital Cover",
];

export const resultLabels = [
    "Super Contribution",
    "Reportable Contributions",
    "Medicare Levy",
    "Medicare Levy Surcharge",
    "HELP Repayment",
    "Base Tax",
    "Total Tax",
    "Net Income",
    "Available To Invest",
    "HELP Balance",
    "Super Balance",
    "Investments Balance",
    "Tax Rate",
    "MLS Rate",
    "HELP Repayment Rate",
];

export const formProcessor = (formData) => {
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
    return taxTime(
        incomeTaxProfile,
        Boolean(formDataVals.max),
        formDataVals.growth,
    );
};
