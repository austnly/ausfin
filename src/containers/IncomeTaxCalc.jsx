import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { taxCalc } from "./../services/calcTS";
import { StyledForm } from "../components/styled/Form.styled";

const IncomeTaxCalc = () => {
	const [input, setInput] = useState("");

	const [income, setIncome] = useState(0);

	const [tax, setTax] = useState({});

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (Number(input)) setIncome(Number(input));
	};

	useEffect(() => {
		setTax(taxCalc(income));
	}, [income]);

	console.log("Rendering ITC comp");

	// useEffect(() => {
	// 	if (tax.totalTax) console.log(`Tax on ${income} is ${tax.totalTax}`);
	// }, [tax]);

	return (
		<>
			<h2>Income Tax Calculator</h2>
			<StyledForm onSubmit={handleSubmit}>
				<label htmlFor="income">Taxable Income:</label>
				<input
					type="text"
					id="income"
					name="income"
					value={input}
					onChange={handleChange}
				/>
				<input type="submit" value="Submit" />
			</StyledForm>
			{tax.totalTax ? (
				<>
					<p>Taxable Income: ${income.toLocaleString()}</p>
					<p>Base Tax: ${tax.baseTax.toLocaleString()}</p>
					<p>
						Tax at {tax.taxBracket}%: $
						{(tax.totalTax - tax.baseTax).toLocaleString()}
					</p>
					<p>Total Tax: ${tax.totalTax.toLocaleString()}</p>
					<h3>Net Income: ${tax.afterTax.toLocaleString()}</h3>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default IncomeTaxCalc;
