import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	makeVar,
} from "@apollo/client";

// 앱 로드 시 로그인 상태를 sessionStorage에서 읽어옴
const isSignedInFromStorage = sessionStorage.getItem("isSignIn") === "true";
export const isSignInVar = makeVar(isSignedInFromStorage);

// GraphQL API 서버와 통신하기 위한 HTTP 링크 생성
const httpLink = createHttpLink({
	uri: "https://localhost:3333/graphql", // GraphQL 엔드포인트를 여기에 입력합니다.
	credentials: "include",
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					isLoggedIn: {
						read() {
							return isSignInVar;
						},
					},
				},
			},
		},
	}),
});
