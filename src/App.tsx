import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
`;
const Highletter = styled.h1`
  color: ${props => props.theme.textColor};
`;
const MyButton = styled.button`
  background-color: ${props => props.theme.btnColor};
  color: ${props => props.theme.textColor};
`;
function App() {


  return (
    <Container>
      <Highletter>Hello</Highletter>
      <MyButton>Click</MyButton>
    </Container>
  );
}

export default App;
