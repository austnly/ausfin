import styled from "@emotion/styled";
import { Button, ButtonBase } from "@mui/material";
import { StyledCard } from "./styled/Card.styled";

const StyledHome = styled.div`
    flex: 1 0;
    display: flex;
    flex-flow: column nowrap;
    /* flex-flow: row nowrap; */
    /* gap: 20px; */
    /* align-content: space-around; */
    /* padding: 20px; */
    font-family: "Montserrat";
    /* font-family: "Abhaiya Libra", serif; */

    /* @media only screen and (max-width: 620px) {
        flex-flow: column-reverse nowrap;
    } */
`;

const SmallHead = styled.h3`
    margin: 12px 0;
    padding: 0;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.5;
    text-align: center;
`;

const LeftBox = styled.div`
    padding: 12px;
    /* background-color: #2b2d42bb; */
    background-color: #e1e1e1e7;
    color: black;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    flex: 1;
    box-sizing: border-box;
    /* align-self: center; */
`;

const RightBox = styled.div`
    padding: 12px;
    background-color: #2b2d42bb;
    /* background-color: #ffffffeb; */
    color: white;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    /* flex: 2; */
    box-sizing: border-box;
    /* align-self: center; */
`;

const BodyPara = styled.p`
    margin: 24px;
    /* text-align: center; */
    font-size: 1.1rem;
`;

const StyledButton = styled(ButtonBase)`
    box-sizing: border-box;
    padding: 10px 24px;
    background-color: #5de85da7;
    color: white;
    font-weight: 600;
    border-radius: 10px;
    margin: 12px auto;
`;

const Home = () => {
    return (
        <StyledHome>
            <LeftBox>
                <SmallHead>Income Taxes</SmallHead>
                <SmallHead>HECS/HELP repayments</SmallHead>
                <SmallHead>Superannuation</SmallHead>
                <SmallHead>Medicare Levy Surcharge</SmallHead>
                <SmallHead>Time to FIRE</SmallHead>
            </LeftBox>
            <RightBox>
                <SmallHead>Run your numbers</SmallHead>
                {/* <BodyPara>
                    If you:
                    <ul>
                        <li>
                            aren't sure how any (or all!) of those things add up
                            to your tax bill
                        </li>
                        <li>
                            want to tinker with the numbers to work out your
                            next tax return
                        </li>
                        <li>
                            need to figure out the optimum way to do your
                            Super/Tax/FIRE
                        </li>
                    </ul>
                    or you just want to tinker with your numbers to plan for the
                    future, this site is for you.
                </BodyPara>
                <BodyPara>
                    The calculators on this site are here to lay out clear and
                    simple. Click below to get started.
                </BodyPara> */}
                <StyledButton>Let's Go</StyledButton>
            </RightBox>
        </StyledHome>
    );
};

export default Home;
