import { gql, useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { sign } from "crypto";
import { ErrorMessage } from "@hookform/error-message";

const S_Conatiner = styled.div`
	position: relative;
	height: calc(100% - 55px);
	border: 2px solid green;
	& > div {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;

		width: 100%;
		border: 1px solid red;

		& > form {
			display: flex;
			gap: 20px;
			flex-direction: column;
			justify-content: center;
			& > div {
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 10px;

				height: 30px;
				& > .tag {
					display: flex;
					align-items: center;
					height: 100%;
				}
				& > input {
					height: 100%;
				}

				& > .errorMessage {
					position: absolute;
					left: calc(100% + 10px);
					top: 50%;
					transform: translateY(-50%);

					white-space: nowrap;

					color: red;
				}

				//버튼
				& > button {
					width: 100%;
					height: 30px;
					border: 1px solid gray;
				}
			}
		}
	}
`;

const GET_SIGN_IN = gql`
	query signIn($input: signInInput!) {
		signIn(input: $input) {
			ok
			error
		}
	}
`;

function SignIn() {
	const { register, handleSubmit, formState } = useForm();

	//graphql start
	const [signIn, signInResult] = useLazyQuery(GET_SIGN_IN);
	const onSubmit = (data: any) => {
		console.log(data);
		signIn({
			variables: {
				input: {
					email: data?.email,
					password: data?.password,
				},
			},
		}).then((response) => {
			if (response.data.signIn?.ok) {
				sessionStorage.setItem("isSignIn", "true");
			} else {
				sessionStorage.setItem("isSignIn", "false");
			}
		});
	};
	useEffect(() => {}, []);
	useEffect(() => {
		if (signInResult.data === undefined) return;
		console.log(signInResult.data);
		if (signInResult.data.signIn?.ok === true) {
			console.log("조건달성");
			window.location.href = "/";
		}
	}, [signInResult]);
	return (
		<S_Conatiner>
			<div>
				<h3>로그인</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<span className="tag">이메일 : </span>
						<input
							type="text"
							{...register("email", {
								required: {
									value: true,
									message: "이메일을 입력해주세요",
								},
								pattern: {
									//이메일 패턴임
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "이메일 형식이 아닙니다",
								},
							})}
						/>
						<ErrorMessage
							name="email"
							errors={formState.errors}
							render={({ message }) => (
								<span className="errorMessage">{message}</span>
							)}
						></ErrorMessage>
					</div>
					<div>
						<span className="tag">비밀번호 : </span>
						<input
							type="password"
							{...register("password", {
								required: {
									value: true,
									message: "비밀번호를 입력해주세요",
								},
							})}
						/>

						<ErrorMessage
							name="password"
							errors={formState.errors}
							render={({ message }) => (
								<span className="errorMessage">{message}</span>
							)}
						></ErrorMessage>
					</div>
					<div>
						<button onClick={(e) => {}}>로그인</button>
					</div>
					<div>
						<Link to={"#none"}>회원가입</Link>
						<div>
							<Link to={"#none"}>아이디 찾기</Link>
							<Link to={"#none"}>비밀번호 찾기</Link>
						</div>
					</div>
				</form>
			</div>
		</S_Conatiner>
	);
}

export default SignIn;
