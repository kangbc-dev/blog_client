import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isSignInVar } from "../../../apolloClient";
import { isSignInUpdate } from "../../../utils/token";

const S_Wrapper = styled.div`
	display: flex;
	justify-content: center;
	border: 1px solid blue;
	padding: 20px;
	& > .signOut {
		width: 200px;
		border: 1px solid #000;
	}
`;

const GET_SIGN_OUT = gql`
	query signOut {
		signOut {
			ok
			error
		}
	}
`;

function Profile() {
	const naviate = useNavigate();
	const isSignIn = useReactiveVar(isSignInVar);
	const [signOut, signOutResult] = useLazyQuery(GET_SIGN_OUT);
	console.log("isSignIn");
	console.log(isSignIn);
	useEffect(() => {
		if (!isSignIn) {
			naviate("../sign_in");
		}
	}, [isSignIn]);
	useEffect(() => {
		if (signOutResult.data?.signOut?.ok === true) {
			isSignInVar(isSignInUpdate(false));
			naviate("../sign_in");
		}
	}, [signOutResult]);
	return (
		<S_Wrapper>
			<div className="signOut">
				<button
					onClick={() => {
						signOut();
					}}
				>
					<span>로그아웃</span>
				</button>
			</div>
		</S_Wrapper>
	);
}

export default Profile;
