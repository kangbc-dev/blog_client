import React from "react";
import styled from "styled-components";

import { IoHomeOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
const S_Container = styled.div`
	position: fixed;
	bottom: 0;

	display: flex;
	justify-content: space-around;

	width: 100%;
	height: 55px;

	background-color: var(--main-color);
	color: var(--sub-color);
	padding: 5px 15px;

	& > a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		height: 100%;

		& > svg {
			font-size: 1.8rem;
			& + span {
				font-size: 0.8rem;
			}
		}
	}
`;

function TabBar() {
	return (
		<S_Container>
			<Link to={"#none"}>
				<IoSearchOutline />
				<span>검색</span>
			</Link>
			<Link to={"/"}>
				<IoHomeOutline />
				<span>홈</span>
			</Link>
			<Link to={"/profile"}>
				<RxAvatar />
				<span>내 정보</span>
			</Link>
		</S_Container>
	);
}

export default TabBar;
