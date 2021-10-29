import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;700&family=Open+Sans:wght@300;400;500&display=swap");
  width: 30rem;
  font-family: "Open Sans";
  box-shadow: 0 0 12px 0 rgb(0, 0, 0, 50%);
  border-radius: 0 0 5px 5px;
`;

const Header = styled.div`
  background-color: #008bff;
  border-radius: 5px 5px 0 0;
  height: 3rem;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1rem;
  align-items: center;
  font-size: 20px;
  color: white;
`;

const HeaderLabel = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderMonth = styled.div`
  padding-right: 1rem;
`;
const HeaderYear = styled.div``;

const HeaderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;

const MonthContainer = styled.div``;

const WeekdaysLabels = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0.5rem;
`;

const WeekdayLabel = styled.div`
  width: 100%;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WeekLine = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.625rem;
  padding: 0.5rem 0.5rem;
`;

type DaySlotProps = {
  empty?: boolean;
};

const DaySlot = styled.div<DaySlotProps>`
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  transition: 0.1s;
  font-size: 18px;
  font-weight: 500;
  cursor: ${(props) => (props.empty ? "" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.empty ? "" : "#75bcfc")};
  }
`;

const MonthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function DatePicker() {
  const [month, setMonth] = useState(9);
  const [year, setYear] = useState(2021);

  function RenderWeekDays() {
    const Weekdays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

    return (
      <>
        {Weekdays.map((weekday) => (
          <WeekdayLabel>{weekday}</WeekdayLabel>
        ))}
      </>
    );
  }

  function RenderDays() {
    const TargetMonth = new Date(year, month, 0);
    const DaysInMonth = TargetMonth.getDate();
    const FirstWeekDay = TargetMonth.getDay();
    let Days = Array.from(Array(DaysInMonth).keys());
    Days.shift();
    const EmptyDays = Array.from(Array(FirstWeekDay).keys());
    const EmptyBlocks = EmptyDays.map((day) => 0);
    Days = [...EmptyBlocks, ...Days];
    return (
      <>
        {Days.map((day) =>
          day === 0 ? <DaySlot empty></DaySlot> : <DaySlot>{day}</DaySlot>
        )}
      </>
    );
  }

  function HandlePreviousMonth() {
    if (month > 0) {
      setMonth(month - 1);
    }
  }
  function HandleNextMonth() {
    if (month < 11) {
      return setMonth(month + 1);
    }
    setMonth(0);
    setYear(year + 1);
  }

  return (
    <Container>
      <Header>
        <HeaderIcon onClick={HandlePreviousMonth}>{"<"}</HeaderIcon>
        <HeaderLabel>
          <HeaderMonth>{MonthNames[month]}</HeaderMonth>
          <HeaderYear>{year}</HeaderYear>
        </HeaderLabel>
        <HeaderIcon onClick={HandleNextMonth}>{">"}</HeaderIcon>
      </Header>
      <MonthContainer>
        <WeekdaysLabels>{RenderWeekDays()}</WeekdaysLabels>
        <WeekLine>{RenderDays()}</WeekLine>
      </MonthContainer>
    </Container>
  );
}
