import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
    color: inherit;
    text-decoration: inherit;
`;

export const StyledCell = styled(StyledLink)`
    width: 100%;
    transition: 0.2s;
    padding: 0 10px;
    box-sizing: border-box;

    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

export default StyledLink;
