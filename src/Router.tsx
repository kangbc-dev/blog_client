import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import TabBar from "./Components/UserInterface/TabBar";
import Main from "./Components/Main";
import User from "./Components/User";

const S_Wrapper = styled.div`
	height: 100%;
`;

function Router() {
	return (
		<S_Wrapper>
			<BrowserRouter>
				{/* <Header /> */}
				<TabBar />
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/user/*" element={<User />} />
				</Routes>
			</BrowserRouter>
		</S_Wrapper>
	);
}

export default Router;
