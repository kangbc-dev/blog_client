export function isSignInUpdate(isSigned: boolean) {
	sessionStorage.setItem("isSignIn", isSigned + "");
	return isSigned;
}
