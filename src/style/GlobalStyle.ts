import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// export const Root_Color = {
// 	/**#7b9acc */
// 	main: "--main-color",
// 	/**#FCF6F5 */
// 	sub: "--sub-color",
// };

export const GlobalStyle = createGlobalStyle`
  :root {
    --main-color: ${(props) => props.theme.primaryColor};
    --sub-color: ${(props) => props.theme.secondaryColor};
  }
  ${reset}
  * {
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    border: none;
    background-color: inherit;
    padding: 10px 20px;

    cursor: pointer;
  }
  html {
    height: 100%;
    &> body {
      height: 100%;
      & > div {
        height: 100%;
      }
    }
  }
`;
