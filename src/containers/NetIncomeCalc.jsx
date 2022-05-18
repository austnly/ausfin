import React from "react";
import Calculator from "./Calculator";
import {
    inputLabels,
    checkBoxLabels,
    resultLabels,
    formProcessor,
} from "../services/netWorthService";

const NetIncomeCalc = () => {
    return (
        <Calculator
            inputs={inputLabels}
            checks={checkBoxLabels}
            results={resultLabels}
            formParser={formProcessor}
        />
    );
};

export default NetIncomeCalc;
