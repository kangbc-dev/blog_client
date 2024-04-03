import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import SignIn from "./SignIn";
import { isSignInVar } from "../../apolloClient";
import { useReactiveVar } from "@apollo/client";
import SignUp from "./SignUp";

function User() {
	const navigate = useNavigate();
	const insSignIn = useReactiveVar(isSignInVar);
	useEffect(() => {
		console.log("마운트됨");
		if (insSignIn) {
			navigate("profile");
		} else {
			navigate("sign_in");
		}
	}, [insSignIn]);
	return (
		<>
			<Routes>
				<Route path="profile" element={<Profile />} />
				<Route path="sign_in" element={<SignIn />} />
				<Route path="sign_up" element={<SignUp />} />
			</Routes>
		</>
	);
}

export default User;
