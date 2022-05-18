import React from "react";
import Calculator from "../containers/Calculator";
import {
    inputLabels,
    checkBoxLabels,
    resultLabels,
    formProcessor,
} from "../services/netWorthService";

const About = () => {
    return (
        <Calculator
            inputs={inputLabels}
            checks={checkBoxLabels}
            results={resultLabels}
            formParser={formProcessor}
        />
    );
};

export default About;
