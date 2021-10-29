import React from "react";
import styled from "styled-components";
import { DatePicker } from "./DatePicker";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Container>
      <DatePicker />
    </Container>
  );
}

export default App;
