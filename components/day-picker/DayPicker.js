import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";

export const DayPicker = ({ weekDays, onChange, className, readOnly }) => {
  const [days, setDays] = useState(weekDays);

  useEffect(() => {
    setDays(weekDays);
  }, [weekDays])

  const handleClick = (e) => {
    const dayIndex = days.findIndex((day) => {
      return day.day === e.target.innerText;
    });

    const daysCopy = [...days];
    daysCopy[dayIndex].selected = !daysCopy[dayIndex].selected;
    setDays(daysCopy);

    if (onChange) {
      return onChange();
    }
  };

  return (
    <DaysContainer className={className}>
      {days &&
        days.map((day, index) => {
          return (
            <Day
              key={index}
              onClick={!readOnly ? handleClick : undefined}
              selected={day.selected}
              readOnly={readOnly}
            >
              {day.day}
            </Day>
          );
        })}
    </DaysContainer>
  );
};

DayPicker.propTypes = {
  weekDays: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

const DaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 24rem;
`;

const Day = styled.div`
  background: ${(props) => (props.selected ? "#265FB1" : "#FFF")};
  color: ${(props) => (props.selected ? "white" : "#E2E2E2")};
  border: ${(props) => !props.selected && "1px solid #E2E2E2"};
  font-size: 1.8rem;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${props => props.readOnly ? 'default' : 'pointer'};
`;

export default DayPicker;