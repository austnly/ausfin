import styled from "@emotion/styled";
import {
    checkBoxLabels,
    helpProcessor,
    inputLabels,
    resultLabels,
} from "../services/helpService";
import Calculator from "./Calculator";

const HelpCalc = () => {
    return (
        <Calculator
            inputs={inputLabels}
            checks={checkBoxLabels}
            results={resultLabels}
            formParser={helpProcessor}
        />
    );
};

export default HelpCalc;
