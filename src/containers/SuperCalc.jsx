import Calculator from "./Calculator";
import {
    inputLabels,
    checkBoxLabels,
    resultLabels,
    superProcessor,
} from "../services/superService";

const SuperCalc = () => {
    return (
        <Calculator
            inputs={inputLabels}
            checks={checkBoxLabels}
            results={resultLabels}
            formParser={superProcessor}
        />
    );
};

export default SuperCalc;
