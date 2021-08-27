import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Calendar as BigCalendar } from "react-big-calendar";
import dayjs from "dayjs";
import dayjsLocalizer from "./dayjsLocalizer";
import calendarStyles from "react-big-calendar/lib/css/react-big-calendar.css";

import { Box, Typography, Divider } from "@material-ui/core";

const Calendar = () => {
  //Gets all to-do items
  const todos = useSelector((state) => state.todos.todos);

  const myEventsList =
    todos !== []
      ? todos.map((todo) => ({
          title: todo.title,
          start: new Date(todo.dateDue),
          end: new Date(todo.dateDue),
          allDay: false,
        }))
      : [];

  return (
    <>
      <Box
        style={{ marginBottom: "1rem" }}
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Typography variant="h4">Calendar</Typography>
      </Box>

      <Divider />

      <div style={{ height: 700 }}>
        <BigCalendar
          localizer={dayjsLocalizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ paddingTop: "1rem" }}
        />
      </div>
    </>
  );
};

export default Calendar;
