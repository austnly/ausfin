import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { superCalc } from "./../services/calcTS";
import { StyledForm } from "../components/styled/Form.styled";

const SuperCalc = () => {
	// const [input, setInput] = useState("");
	// const [income, setIncome] = useState(0);
	// const [rate, setRate] = useState(9.5);
	// const [inclusive, setInclusive] = useState(false);
	// const [max, setMax] = useState(false);

	const [result, setResult] = useState({});

	// const handleChange = (e) => {
	// 	setInput(e.target.value);
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const incomeSuperInput = {
			income: Number(formData.get("income")),
			incl: Boolean(formData.get("inclusive")),
			rate: Number(formData.get("rate")),
			max: Boolean(formData.get("max")),
		};
		setResult(superCalc(incomeSuperInput));
	};

	useEffect(() => {
		console.log("Super Calc result:", result);
	}, [result]);

	return (
		<>
			<h2>Superannuation Calculator</h2>
			<StyledForm onSubmit={handleSubmit}>
				<label htmlFor="income">Taxable Income:</label>
				<input
					type="text"
					id="income"
					name="income"
					min={0}
					required
					// value={input}
					// onChange={handleChange}
				/>
				<label htmlFor="inclusive">Income includes super?</label>
				<input
					type="checkbox"
					name="inclusive"
					id="inclusive"
					// onChange={(e) => setInclusive(e.target.checked)}
				/>
				<label htmlFor="rate">Contribution % Rate:</label>
				<input
					type="number"
					name="rate"
					id="rate"
					defaultValue={9.5}
					// onChange={(e) => setRate(e.target.value)}
					min={0}
					max={100}
					step={0.1}
					required
				/>
				<label htmlFor="max">Maximise Contributions?</label>
				<input
					type="checkbox"
					name="max"
					id="max"
					// onChange={(e) => setMax(e.target.checked)}
				/>
				<input type="submit" value="Submit" />
			</StyledForm>
			{result.afterSuper ? (
				<>
					<p>
						Super Contribution: $
						{result.superContrib.toLocaleString()}
					</p>
					<p>
						Reportable Contributions: $
						{result.reportableSuper.toLocaleString()}
					</p>
					<h3>Net Income: ${result.afterSuper.toLocaleString()}</h3>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default SuperCalc;
