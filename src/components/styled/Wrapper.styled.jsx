import styled from "@emotion/styled";
import bg from "./../../services/static/img/background.jpeg";

const Wrapper = styled.div`
    background-image: linear-gradient(#6d6d6d52, #45454544), url(${bg});
    background-size: cover;
    background-position: 50% 25%;
    background-attachment: fixed;
    display: flex;
    flex-flow: column nowrap;
    min-height: 100vh;
`;

export default Wrapper;
