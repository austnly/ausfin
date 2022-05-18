import styled from "@emotion/styled";

export const StyledNav = styled.nav`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
	z-index: 1;

	flex-grow: 0;
	flex-shrink: 0;

	> * {
		flex-grow: 1;
	}

	ul {
		list-style: none;

		display: flex;
		gap: 10px;
	}
`;

export const Logo = styled.div`
	/* color: grey; */
	text-align: center;
`;
