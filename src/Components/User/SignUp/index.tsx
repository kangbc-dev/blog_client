import { gql, useMutation } from "@apollo/client";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isSignInUpdate } from "../../../utils/token";
import { isSignInVar } from "../../../apolloClient";

const S_Wrapper = styled.div`
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

			border: 1px solid pink;

			width: 300px;
			& > div {
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;

				width: 100%;
				height: 30px;
				& > .tag {
					display: flex;
					align-items: center;
					height: 100%;
				}
				& > input {
					width: calc(100% - 100px);
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

const POST_SIGNUP = gql`
	mutation signUp($input: signUpInput!) {
		signUp(input: $input) {
			ok
			error
		}
	}
`;

function SignUp() {
	const navigate = useNavigate();
	const { register, handleSubmit, formState, watch } = useForm();
	const password = watch("password");
	const [signUp, signUpResult] = useMutation(POST_SIGNUP);
	const onSubmit = (data: any) => {
		console.log(data);
		signUp({
			variables: {
				input: {
					nickname: data?.nickname,
					email: data?.email,
					password: data?.password,
				},
			},
		}).then((response) => {
			console.log(response.data);
			if (response.data?.signUp?.ok === true) {
				alert("회원가입이 완료되었습니다.");
				isSignInVar(isSignInUpdate(true));
				navigate("/");
			} else if (response.data?.signUp?.ok === false) {
				alert("회원가입에 실패했습니다.");
			} else {
				alert("알 수 없는 오류가 발생했습니다.");
			}
			return;
		});
	};
	return (
		<S_Wrapper>
			<div>
				<h3>회원가입</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<div className="tag">닉네임 : </div>
						<input
							{...register("nickname", {
								required: {
									value: true,
									message: "닉네임을 입력해주세요.",
								},
								minLength: {
									value: 2,
									message: "닉네임은 2자 이상이어야 합니다.",
								},
								maxLength: {
									value: 10,
									message: "닉네임은 10자 이하여야 합니다.",
								},
							})}
						/>
						<ErrorMessage
							name="nickname"
							errors={formState.errors}
							render={({ message }) => (
								<span className="errorMessage">{message}</span>
							)}
						></ErrorMessage>
					</div>
					<div>
						<div className="tag">이메일 : </div>
						<input
							type="email"
							{...register("email", {
								required: {
									value: true,
									message: "이메일을 입력해주세요.",
								},
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "이메일 형식이 아닙니다.",
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
						<div className="tag">비밀번호 : </div>
						<input
							type="password"
							{...register("password", {
								required: {
									value: true,
									message: "비밀번호를 입력해주세요.",
								},
								minLength: {
									value: 8,
									message: "비밀번호는 8자 이상이어야 합니다.",
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
						<div className="tag">비밀번호 확인 : </div>
						<input
							type="password"
							{...register("passwordCheck", {
								required: {
									value: true,
									message: "비밀번호를 입력해주세요.",
								},
								minLength: {
									value: 8,
									message: "비밀번호는 8자 이상이어야 합니다.",
								},
								validate: (value) => {
									return value === password || "비밀번호가 일치하지 않습니다.";
								},
							})}
						/>
						<ErrorMessage
							name="passwordCheck"
							errors={formState.errors}
							render={({ message }) => (
								<span className="errorMessage">{message}</span>
							)}
						></ErrorMessage>
					</div>
					<div>
						<button>회원가입</button>
					</div>
				</form>
			</div>
		</S_Wrapper>
	);
}

export default SignUp;
