import React, { useState } from "react";
import CalendarGrid from "./component/CalendarGrid";

const App = () => {
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || {}
  );
  const [darkMode, setDarkMode] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState("");

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.body.className = darkMode ? "light-mode" : "dark-mode";
  };

  const addOrUpdateEvent = (date, updatedEvents) => {
    const newEvents = { ...events, [date]: updatedEvents };
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
  };

  const removeEvent = (date, index) => {
    const updatedEvents = events[date].filter((_, idx) => idx !== index);
    if (updatedEvents.length) {
      addOrUpdateEvent(date, updatedEvents);
    } else {
      const { [date]: _, ...rest } = events;
      setEvents(rest);
      localStorage.setItem("events", JSON.stringify(rest));
    }
  };

  const clearEventsForDate = (date) => {
    const { [date]: _, ...rest } = events;
    setEvents(rest);
    localStorage.setItem("events", JSON.stringify(rest));
  };

  const exportEvents = (format) => {
    const eventsForMonth = Object.keys(events).reduce((acc, date) => {
      acc[date] = events[date];
      return acc;
    }, {});

    const data =
      format === "json"
        ? JSON.stringify(eventsForMonth, null, 2)
        : Object.entries(eventsForMonth)
            .map(([date, events]) =>
              events.map(
                (event) =>
                  `${date},${event.eventName},${event.startTime},${event.endTime},${event.eventType}`
              )
            )
            .flat()
            .join("\n");

    const blob = new Blob([data], {
      type: format === "json" ? "application/json" : "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `events.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="controls">
        <button onClick={toggleTheme}>
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
       
        <button onClick={() => exportEvents("json")}>Export as JSON</button>
        <button onClick={() => exportEvents("csv")}>Export as CSV</button>
      </div>
      <h1>Dynamic Event Calendar</h1>
      <CalendarGrid
        events={events}
        addOrUpdateEvent={addOrUpdateEvent}
        removeEvent={removeEvent}
        clearEventsForDate={clearEventsForDate}
        filterKeyword={filterKeyword}
      />
    </div>
  );
};

export default App;
