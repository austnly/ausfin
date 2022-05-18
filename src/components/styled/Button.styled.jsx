import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";

const StyledButton = styled(ButtonBase)`
    box-sizing: border-box;
    padding: 10px 24px;
    background-color: #5de85da7;
    color: white;
    font-weight: 600;
    border-radius: 10px;
    margin: 12px auto;
`;

export const CalculatorButton = styled(ButtonBase)`
    box-sizing: border-box;
    padding: 10px 24px;
    background-color: #2b2d42;
    color: white;
    text-transform: uppercase;
    margin-top: 24px;
    border-radius: 12px;
    transition: 0.2s;

    &:hover {
        opacity: 0.9;
    }
`;

export default StyledButton;
