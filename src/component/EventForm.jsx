import React, { useState } from "react";

const EventForm = ({
  date,
  events,
  addOrUpdateEvent,
  removeEvent,
  clearEventsForDate,
  closeForm,
}) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventType, setEventType] = useState("personal");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for overlapping events
    const isOverlapping = events.some(
      (event) =>
        (startTime >= event.startTime && startTime < event.endTime) ||
        (endTime > event.startTime && endTime <= event.endTime)
    );

    if (isOverlapping) {
      alert("Events cannot overlap.");
      return;
    }

    // Add the new event
    const newEvent = { eventName, startTime, endTime, eventType };
    addOrUpdateEvent(date, [...events, newEvent]);

    // Reset form fields
    setEventName("");
    setStartTime("");
    setEndTime("");
    setEventType("personal");

    // Close form
    closeForm();
  };

  return (
    <div className="event-form">
      <h3>Add Event for {date}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="other">Other</option>
        </select>
        <div className="form-actions">
          <button type="submit">Save</button>
          <button
            type="button"
            className="delete-button"
            onClick={() => clearEventsForDate(date)}
          >
            Delete All Events
          </button>
          <button type="button" onClick={closeForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
