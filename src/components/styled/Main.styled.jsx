import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

const StyledMain = styled.main`
    /* background-color: #e4e4e4; */
    flex-grow: 1;
    box-sizing: border-box;
    padding: 16px;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
`;

const Main = () => {
    return (
        <StyledMain>
            <Outlet />
        </StyledMain>
    );
};

export default Main;
