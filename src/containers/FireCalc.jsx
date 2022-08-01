import Calculator from "./Calculator";
import {
    inputLabels,
    checkBoxLabels,
    resultLabels,
    fireProcessor,
} from "../services/fireService";

const FireCalc = () => {
    return (
        <Calculator
            inputs={inputLabels}
            checks={checkBoxLabels}
            results={resultLabels}
            formParser={fireProcessor}
        />
    );
};

export default FireCalc;
