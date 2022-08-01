import React from "react";
import { useEffect, useState } from "react";
import { IncomeTaxProfile, NetWorth, taxTime } from "./../services/calcTS-mod";
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
import { camelCase } from "../services/utils";
import StyledButton, {
    CalculatorButton,
} from "../components/styled/Button.styled";

const Calculator = ({ inputs, checks, results, formParser }) => {
    const [result, setResult] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const result = await formParser(formData);
        setResult(result);
    };

    useEffect(() => {
        console.log("Calc result:", result);
    }, [result]);

    // useContext to append form data by page
    // change display

    return (
        <Container>
            <StyledCard>
                {/* <p>Blurb about form contents. </p> */}
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        {inputs.map((label, index) => {
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

                        {checks.map((label) => {
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

                        <CalculatorButton variant="contained" type="submit">
                            Submit
                        </CalculatorButton>
                    </FormControl>
                </form>
            </StyledCard>
            <>
                {result?.hasOwnProperty(camelCase(results[0])) ? (
                    <StyledCard>
                        {results.map((label) => {
                            return /Rate$/.test(label) ? (
                                <p key={label}>
                                    {label}: {result[camelCase(label)]}%
                                </p>
                            ) : /FIRE$/.test(label) ? (
                                <p key={label}>
                                    {label}: {result[camelCase(label)]}
                                </p>
                            ) : (
                                <p key={label}>
                                    {label}: ${result[camelCase(label)]}
                                </p>
                            );
                        })}
                    </StyledCard>
                ) : (
                    <></>
                )}
            </>
        </Container>
    );
};

export default Calculator;
