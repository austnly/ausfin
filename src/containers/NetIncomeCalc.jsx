import React from "react";
import { useEffect, useState } from "react";
import { IncomeTaxProfile, NetWorth, taxTime } from "./../services/calcTS";
import { StyledForm } from "../components/styled/Form.styled";
import styled from "@emotion/styled";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    TextField,
} from "@mui/material";
import { Button } from "@mui/material";
import { StyledCard, Container } from "../components/styled/Card.styled";

const NetIncomeCalc = () => {
    const [result, setResult] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
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
            formDataVals.contributionRate,
            formDataVals.deductions,
            formDataVals.fringeBenefits,
            Boolean(formDataVals.privateHospitalCover),
        );
        console.log(incomeTaxProfile);
        setResult(
            taxTime(
                incomeTaxProfile,
                Boolean(formDataVals.max),
                formDataVals.growth,
            ),
        );
    };

    useEffect(() => {
        console.log("Tax Calc result:", result);
    }, [result]);

    const inputLabels = [
        "Gross Income",
        "Expenses",
        "Contribution Rate",
        "Deductions",
        "Fringe Benefits",
        "HELP Balance",
        "Super Balance",
        "Investments Balance",
        "Assumed Growth",
    ];

    const checkBoxLabels = [
        "Super Inclusive",
        "Max Super Contributions",
        "Private Hospital Cover",
    ];

    const camelCase = (string) => {
        return (
            string.split(" ")[0].toLowerCase() +
            string.split(" ").slice(1).join("")
        );
    };

    // useContext to append form data by page
    // change display

    return (
        <Container>
            <StyledCard>
                {/* <p>Blurb about form contents. </p> */}
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        {inputLabels.map((label, index) => {
                            return (
                                <TextField
                                    key={camelCase(label)}
                                    id={camelCase(label)}
                                    name={camelCase(label)}
                                    label={label}
                                    variant="standard"
                                    inputProps={{
                                        inputMode: "numeric",
                                        pattern: "[0-9]*",
                                    }}
                                    required={index === 0 || index === 1}
                                />
                            );
                        })}

                        {checkBoxLabels.map((label) => {
                            return (
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label={label}
                                    name={camelCase(label)}
                                    key={camelCase(label)}
                                    id={camelCase(label)}
                                />
                            );
                        })}

                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </FormControl>
                </form>
            </StyledCard>
            <>
                {result.income ? (
                    <StyledCard>
                        <p>
                            Super Contribution: $
                            {result.superContrib.toLocaleString()}
                        </p>
                        <p>
                            Reportable Contributions: $
                            {result.reportableSuper.toLocaleString()}
                        </p>
                        <p>
                            HELP Repayment: ${result.helpRepay.toLocaleString()}
                        </p>
                        <p>
                            HELP Repayment Rate:
                            {result.helpRate.toLocaleString()}%
                        </p>
                        <p>
                            Medicare Levy: ${result.medicare.toLocaleString()}
                        </p>
                        <p>
                            Medicare Levy Surcharge: $
                            {result.mlsRepay.toLocaleString()}
                        </p>
                        <p>
                            MLS Rate:
                            {result.mlsRate.toLocaleString()}%
                        </p>
                        <p>Base Tax: ${result.baseTax.toLocaleString()}</p>
                        <p>
                            Tax Bracket:
                            {result.taxBracket.toLocaleString()}%
                        </p>
                        <p>Total Tax: ${result.totalTax.toLocaleString()}</p>
                        <h3>Net Income: ${result.income.toLocaleString()}</h3>
                        <p>
                            Money to Invest after Expenses and Taxes etc.: $
                            {result.invContrib.toLocaleString()}
                        </p>
                        <p>HELP Balance: ${result.helpBal.toLocaleString()}</p>
                        <p>
                            Super Balance: ${result.superBal.toLocaleString()}
                        </p>
                        <p>
                            Investment Balance: $
                            {result.invBal.toLocaleString()}
                        </p>
                    </StyledCard>
                ) : (
                    <></>
                )}
            </>
        </Container>
    );
};

export default NetIncomeCalc;
