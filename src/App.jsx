import styled from "@emotion/styled";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FireCalc from "./containers/FireCalc";
import NetIncomeCalc from "./containers/NetIncomeCalc";
import IncomeTaxCalc from "./containers/SimpleTaxCalc";
import HelpCalc from "./containers/HelpCalc";
import MLSCalc from "./containers/MLSCalc";
import Home from "./components/Home";
import About from "./components/About";
import Main from "./components/styled/Main.styled";
import Footer from "./components/styled/Footer.styled";
import Wrapper from "./components/styled/Wrapper.styled";
import SuperCalc from "./containers/SuperCalc";
import SimpleTaxCalc from "./containers/SimpleTaxCalc";

const App = () => {
    return (
        <Wrapper>
            <Navbar />
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="fire" element={<FireCalc />} />
                    <Route path="tax" element={<NetIncomeCalc />} />
                    <Route path="help-repay" element={<HelpCalc />} />
                    <Route path="medicare" element={<MLSCalc />} />
                    <Route path="super" element={<SuperCalc />} />
                    <Route path="simple" element={<SimpleTaxCalc />} />
                </Route>
            </Routes>
            <Footer>
                <p>Built by Austin.</p>
            </Footer>
        </Wrapper>
    );
};

export default App;
