import styled from "@emotion/styled";
import Calculator from "./Calculator";
import {
    inputLabels,
    checkBoxLabels,
    resultLabels,
    taxProcessor,
} from "../services/simpleTaxService";

const SimpleTaxCalc = () => {
    return (
        <Calculator
            inputs={inputLabels}
            checks={checkBoxLabels}
            results={resultLabels}
            formParser={taxProcessor}
        />
    );
};

export default SimpleTaxCalc;
