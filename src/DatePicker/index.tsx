import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;700&family=Open+Sans:wght@300;400;500&display=swap");
  width: 30rem;
  font-family: "Open Sans";
  box-shadow: 0 0 12px 0 rgb(0, 0, 0, 50%);
  border-radius: 0 0 5px 5px;
  position: absolute;
  top: 55vh;
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
  align-items: center;
`;

const HeaderMonth = styled.div`
  padding-right: 1rem;
  font-size: 24px;
`;
const HeaderYear = styled.div`
  font-size: 24px;
  color: pink;
`;

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
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.625rem 0;
  padding: 0.5rem 0.5rem;
  margin-bottom: 1rem;
`;

function CursorType(status: Status) {
  switch (status) {
    case "EMPTY":
      return "";

    case "DISABLED":
      return "not-allowed";

    default:
      return "pointer";
  }
}

function BackgroundHoverColor(status: Status) {
  switch (status) {
    case "EMPTY":
      return "";
    case "DISABLED":
      return "";
    case "SELECTED":
      return "#3697eb";

    default:
      return "#75bcfc";
  }
}
function BackgroundColor(status: Status) {
  switch (status) {
    case "EMPTY":
      return "";
    case "ALLOWED":
      return "";
    case "DISABLED":
      return "";
    case "SELECTED":
      return "#3697eb";
    case "BETWEEN":
      return "#e780e2";

    default:
      return "";
  }
}

type Status = "EMPTY" | "DISABLED" | "SELECTED" | "ALLOWED" | "BETWEEN";

type DaySlotProps = {
  status: Status;
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
  opacity: ${(props) => (props.status === "DISABLED" ? 0.5 : 1)};
  cursor: ${(props) => CursorType(props.status)};
  background-color: ${(props) => BackgroundColor(props.status)};
  &:hover {
    background-color: ${(props) => BackgroundHoverColor(props.status)};
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

type DatePickerProps = {
  first?: Date;
  last?: Date;
  setFirst: (first: Date) => void;
  setLast: (last: Date) => void;
};

export function DatePicker({
  first,
  last,
  setFirst,
  setLast,
}: DatePickerProps) {
  const Today = new Date();
  const [hoveredDate, setHoveredDate] = useState<Date>(new Date());
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
    const EmptyDays = new Array(FirstWeekDay).fill(-1);
    Days = [...EmptyDays, ...Days];
    return <>{Days.map((day) => DayShouldRender(day + 1))}</>;
  }

  function DayShouldRender(day: number) {
    if (day === 0) return <DaySlot status="EMPTY"></DaySlot>;
    const DateDay = new Date(`${month + 1}/${day}/${year}`);
    if (DateDay.getTime() < Today.getTime())
      return <DaySlot status="DISABLED">{day}</DaySlot>;

    if (first) {
      if (DateDay.getTime() === first.getTime())
        return <DaySlot status="SELECTED">{day}</DaySlot>;

      if (
        DateDay.getTime() > first.getTime() &&
        DateDay.getTime() < hoveredDate.getTime()
      )
        return (
          <DaySlot
            status="BETWEEN"
            onClick={() => {
              HandleSelectDay(DateDay);
            }}
            onMouseEnter={() => {
              setHoveredDate(DateDay);
            }}
          >
            {day}
          </DaySlot>
        );
    }

    return (
      <DaySlot
        status="ALLOWED"
        onClick={() => {
          HandleSelectDay(DateDay);
        }}
        onMouseEnter={() => {
          setHoveredDate(DateDay);
        }}
      >
        {day}
      </DaySlot>
    );
  }

  function HandlePreviousMonth() {
    if (month > 0) {
      return setMonth(month - 1);
    }
    setMonth(11);
    setYear(year - 1);
  }

  function HandleNextMonth() {
    if (month < 11) {
      return setMonth(month + 1);
    }
    setMonth(0);
    setYear(year + 1);
  }

  function HandleSelectDay(DateDay: Date) {
    setFirst(DateDay);
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
        <DaysContainer>{RenderDays()}</DaysContainer>
      </MonthContainer>
    </Container>
  );
}
