import React, { useState } from "react";
import styled from "styled-components";
import { DatePicker } from "./DatePicker";

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  return (
    <Container>
      <h1>{first}</h1>
      <h1>{last}</h1>
      <DatePicker
        first={first}
        last={last}
        setFirst={setFirst}
        setLast={setLast}
      />
    </Container>
  );
}

export default App;
