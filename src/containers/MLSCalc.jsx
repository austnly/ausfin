import React from "react";
import { useState } from "react";
import { totalMLS } from "../services/calcTS";
import { StyledForm } from "../components/styled/Form.styled";

const MLSCalc = () => {
	const [result, setResult] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const incomeAssessable =
			Number(formData.get("income")) + Number(formData.get("rFBT"));
		setResult(totalMLS(incomeAssessable));
	};

	return (
		<>
			<h2>Medicare Levy Surcharge Calculator</h2>
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
				<label htmlFor="rFBT">Reportable Fringe Benefits:</label>
				<input type="text" id="rFBT" name="rFBT" min={0} />

				<input type="submit" value="Submit" />
			</StyledForm>
			<h3>
				Repayment Rate:{" "}
				{result.mlsRate ? result.mlsRate.toLocaleString() + "%" : "0%"}
			</h3>
			<h3>
				Total Medicare Levy Surcharge: $
				{result.mlsRepay ? result.mlsRepay.toLocaleString() : "0"}
			</h3>
		</>
	);
};

export default MLSCalc;
