import React from "react";
import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegBell } from "react-icons/fa";
const S_Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	height: 45px;
	padding: 0 5px;
	margin-bottom: 5px;

	background-color: var(--sub-color);
	color: var(--main-color);

	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
	& > div {
		& > svg {
			font-size: 1.5rem;
		}
		&:first-child > svg {
			font-size: 1.75rem;
		}
	}
`;

function Header() {
	return (
		<S_Container>
			<div>
				<RxHamburgerMenu />
			</div>
			<div>
				<FaRegBell />
			</div>
		</S_Container>
	);
}

export default Header;
