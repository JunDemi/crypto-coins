import React, { useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { LightTheme, DarkTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=DM+Sans&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
body{
  font-family: 'Source Sans Pro', sans-serif;
  transition: .2s;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor}
}
a{
  text-decoration: none;
  color: inherit;
}
*{
  box-sizing: border-box;
}
`;
const ToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 30px;
  background-color: ${props => props.theme.cardBgColor};
  box-shadow: 2px 2px 4px ${props => props.theme.shadow};
  padding: 15px;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    transition: .2s ease-in;
  }
`;

function App() {
  const [islight, set_light] = useState(false);
  const themeToggle = () => set_light((change) => !change);
  return (
    <>
      <ThemeProvider theme={islight ? LightTheme : DarkTheme}>
        <ToggleButton onClick={themeToggle}>
          <img src={islight ? `https://cdn-icons-png.flaticon.com/512/6714/6714978.png` : `https://cdn-icons-png.flaticon.com/512/8637/8637690.png`} width="20px" height="20px" />
        </ToggleButton>
        <GlobalStyle />
        <Router islight={islight} themeToggle={themeToggle}/>
      </ThemeProvider>
    </>
  )
}

export default App;
