import Calculator from "./Calculator";
import {
    checkBoxLabels,
    inputLabels,
    mlsProcessor,
    resultLabels,
} from "../services/mlsService";

const MLSCalc = () => {
    return (
        <Calculator
            inputs={inputLabels}
            checks={checkBoxLabels}
            results={resultLabels}
            formParser={mlsProcessor}
        />
    );
};

export default MLSCalc;
