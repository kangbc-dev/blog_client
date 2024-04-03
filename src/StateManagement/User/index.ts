import { makeVar } from "@apollo/client";

// 앱 로드 시 로그인 상태를 sessionStorage에서 읽어옴
const isSignedInFromStorage = sessionStorage.getItem("isSignIn") === "true";
export const isSignInVar = makeVar(isSignedInFromStorage);

export function checkToken(callBack: any, method: any) {
	callBack(method).then((result: any) => {
		console.log(result);
	});
}
