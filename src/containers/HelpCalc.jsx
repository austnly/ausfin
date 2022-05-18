import styled from "@emotion/styled";
import { useState } from "react";
import { StyledForm } from "../components/styled/Form.styled";
import { totalHELP } from "../services/calcTS";

const HelpCalc = () => {
	const [result, setResult] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const incomeAssessable =
			Number(formData.get("income")) +
			Number(formData.get("rSuper")) +
			Number(formData.get("rFBT"));
		setResult(totalHELP(incomeAssessable));
	};

	return (
		<>
			<h2>HELP Repayment Calculator</h2>
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
				<label htmlFor="rSuper">Reportable Super Contributions: </label>
				<input type="text" id="rSuper" name="rSuper" min={0} />
				<label htmlFor="rFBT">Reportable Fringe Benefits:</label>
				<input type="text" id="rFBT" name="rFBT" min={0} />

				<input type="submit" value="Submit" />
			</StyledForm>
			<h3>
				Repayment Rate:{" "}
				{result.helpRate
					? result.helpRate.toLocaleString() + "%"
					: "0%"}
			</h3>
			<h3>
				Total HELP Repayment: $
				{result.helpRepay ? result.helpRepay.toLocaleString() : "0"}
			</h3>
		</>
	);
};

export default HelpCalc;
