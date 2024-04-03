import React, { useEffect } from "react";
import { gql, useLazyQuery, useQuery, useReactiveVar } from "@apollo/client";
import { GlobalStyle } from "./style/GlobalStyle";
import Router from "./Router";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "./style/theme";

const GET_CHECK_TOKEN = gql`
	query checkToken {
		checkToken {
			ok
			error
		}
	}
`;

function App() {
	const [checkTokenQuery, checkToken] = useLazyQuery(GET_CHECK_TOKEN);
	useEffect(() => {
		if (checkToken.data?.checkToken?.ok === false) {
			sessionStorage.setItem("isSignIn", "false");
			return;
		} else if (checkToken.data?.checkToken?.ok !== undefined) {
			console.log("checkToken");
			console.log(checkToken.data);
			sessionStorage.setItem("isSignIn", "true");
		}
	}, [checkToken.data?.checkToken?.ok]);
	return (
		<>
			<ThemeProvider theme={LightTheme}>
				<GlobalStyle />
				<Router />
			</ThemeProvider>
		</>
	);
}

export default App;
