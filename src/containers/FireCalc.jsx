import styled from "@emotion/styled";
import { StyledForm } from "../components/styled/Form.styled";
import { timeToFIRE, IncomeTaxProfile, NetWorth } from "../services/calcTS-mod";
import { useState, useEffect } from "react";
import Calculator from "./Calculator";
import {
    inputLabels,
    checkBoxLabels,
    resultLabels,
    fireProcessor,
} from "../services/fireService";

const FireCalc = () => {
    return (
        <Calculator
            inputs={inputLabels}
            checks={checkBoxLabels}
            results={resultLabels}
            formParser={fireProcessor}
        />
    );
    // const [result, setResult] = useState({});

    // const handleSubmit = (e) => {
    // 	e.preventDefault();
    // 	const formData = new FormData(e.target);
    // 	let formDataVals = {};
    // 	for (const [key, value] of formData.entries()) {
    // 		formDataVals[key] =
    // 			Number(value) || value === "0" ? Number(value) : value;
    // 	}
    // 	console.log("Form Data:", formDataVals);
    // 	const netWorth = new NetWorth(
    // 		formDataVals.income,
    // 		formDataVals.helpBal,
    // 		formDataVals.superBal,
    // 		formDataVals.invBal,
    // 	);
    // 	console.log(netWorth);
    // 	const incomeTaxProfile = new IncomeTaxProfile(
    // 		netWorth,
    // 		formDataVals.expenses,
    // 		Boolean(formDataVals.incl),
    // 		formDataVals.rate,
    // 		formDataVals.deductions,
    // 		formDataVals.fringeBenefits,
    // 		Boolean(formDataVals.phi),
    // 	);
    // 	console.log(incomeTaxProfile);
    // 	setResult(
    // 		timeToFIRE(incomeTaxProfile, formDataVals.age, formDataVals.growth),
    // 	);
    // };

    // useEffect(() => {
    // 	console.log("Fire Calc result:", result);
    // }, [result]);

    // return (
    // 	<>
    // 		<h2>FIRE Calculator</h2>
    // 		<StyledForm onSubmit={handleSubmit}>
    // 			<label htmlFor="age">Age:</label>
    // 			<input type="text" id="age" name="age" min={0} required />

    // 			<label htmlFor="income">Gross Income:</label>
    // 			<input type="text" id="income" name="income" min={0} required />

    // 			<label htmlFor="incl">Income includes super?</label>
    // 			<input type="checkbox" name="incl" id="incl" />
    // 			<label htmlFor="rate">Contribution % Rate:</label>
    // 			<input
    // 				type="number"
    // 				name="rate"
    // 				id="rate"
    // 				defaultValue={9.5}
    // 				min={0}
    // 				max={100}
    // 				step={0.1}
    // 				required
    // 			/>
    // 			<label htmlFor="phi">MLS-exempt Hospital Insurance?</label>
    // 			<input type="checkbox" name="phi" id="phi" />
    // 			<label htmlFor="expenses">Expenses:</label>
    // 			<input
    // 				type="text"
    // 				id="expenses"
    // 				name="expenses"
    // 				min={0}
    // 				required
    // 			/>
    // 			<label htmlFor="deductions">Deductions:</label>
    // 			<input
    // 				type="text"
    // 				id="deductions"
    // 				name="deductions"
    // 				min={0}
    // 				defaultValue={0}
    // 			/>
    // 			<label htmlFor="fringeBenefits">Fringe Benefits:</label>
    // 			<input
    // 				type="text"
    // 				id="fringeBenefits"
    // 				name="fringeBenefits"
    // 				min={0}
    // 				defaultValue={0}
    // 			/>
    // 			<label htmlFor="helpBal">HELP Balance:</label>
    // 			<input
    // 				type="text"
    // 				id="helpBal"
    // 				name="helpBal"
    // 				min={0}
    // 				defaultValue={0}
    // 			/>
    // 			<label htmlFor="superBal">Super Balance:</label>
    // 			<input
    // 				type="text"
    // 				id="superBal"
    // 				name="superBal"
    // 				min={0}
    // 				defaultValue={0}
    // 			/>
    // 			<label htmlFor="invBal">Investments Balance:</label>
    // 			<input
    // 				type="text"
    // 				id="invBal"
    // 				name="invBal"
    // 				min={0}
    // 				defaultValue={0}
    // 			/>
    // 			<label htmlFor="growth">Assumed Growth %:</label>
    // 			<input
    // 				type="text"
    // 				id="growth"
    // 				name="growth"
    // 				min={0}
    // 				defaultValue={0}
    // 			/>
    // 			<input type="submit" value="Submit" />
    // 		</StyledForm>
    // 		{result.years && (
    // 			<h3>
    // 				You will reach FIRE in {result.years} years at age{" "}
    // 				{result.age}
    // 			</h3>
    // 		)}
    // 	</>
    // );
};

export default FireCalc;
