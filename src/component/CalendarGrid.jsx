import React, { useState } from "react";
import EventForm from "./EventForm";
import { getCalendarDays, isSameDay } from "../utils/calendarUtils";

const CalendarGrid = ({
  events,
  addOrUpdateEvent,
  removeEvent,
  clearEventsForDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null); // For editing existing events

  const days = getCalendarDays(currentMonth);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dateString = date.toISOString().split("T")[0];
    const event = events[dateString]?.[0] || null; // Get the first event of the clicked date (if any)
    setEventToEdit(event); // Set event to edit if it exists
  };

  const isWeekend = (day) => {
    const dayOfWeek = day.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
  };

  return (
    <div className="calendar-grid">
      <header>
        <button
          onClick={() =>
            setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))
          }
        >
          Previous
        </button>
        <h2>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={() =>
            setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))
          }
        >
          Next
        </button>
      </header>

      <div className="days-grid">
        {days.map(({ date, isCurrentMonth }) => (
          <div
            key={date.toISOString()}
            className={`day ${
              isSameDay(date, new Date()) ? "today" : ""
            } ${
              selectedDate && isSameDay(date, selectedDate) ? "selected" : ""
            } ${
              isCurrentMonth ? "" : "not-current-month"
            } ${isWeekend(date) ? "weekend" : "weekday"}`} // Weekend and weekday class applied here
            onClick={() => handleDateClick(date)} // Trigger modal on click
          >
            <span>{date.getDate()}</span>

            {events[date.toISOString().split("T")[0]] &&
              events[date.toISOString().split("T")[0]].map((event, idx) => (
                <div key={idx} className={`event-tag ${event.eventType.toLowerCase()}`}>
                  {event.eventName}
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Event Form Modal */}
      {selectedDate && (
        <EventForm
          date={selectedDate.toISOString().split("T")[0]}
          events={events[selectedDate.toISOString().split("T")[0]] || []}
          addOrUpdateEvent={addOrUpdateEvent}
          removeEvent={removeEvent}
          eventToEdit={eventToEdit} // Pass event to edit
          clearEventsForDate={clearEventsForDate}
          closeForm={() => {
            setSelectedDate(null);
            setEventToEdit(null); // Reset event when form is closed
          }}
        />
      )}
    </div>
  );
};

export default CalendarGrid;
