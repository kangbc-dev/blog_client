import { DefaultTheme } from "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		primaryColor?: string;
		secondaryColor?: string;
	}
}

export const LightTheme: DefaultTheme = {
	primaryColor: "#7b9acc",
	secondaryColor: "#FCF6F5",
};

export const DarkTheme: DefaultTheme = {
	primaryColor: "#000000",
	secondaryColor: "#ffffff",
};
