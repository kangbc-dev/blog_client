import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import TabBar from "./Components/UserInterface/TabBar";
import Profile from "./Components/Profile";
import SignIn from "./Components/SignIn";
import Main from "./Components/Main";
import Header from "./Components/UserInterface/Header";

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
					<Route path="/profile" element={<Profile />} />
					<Route path="/sign_in" element={<SignIn />} />
				</Routes>
			</BrowserRouter>
		</S_Wrapper>
	);
}

export default Router;
