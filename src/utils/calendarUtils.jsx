export const getCalendarDays = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days = [];
  
    for (let i = firstDay.getDay(); i > 0; i--) {
      const day = new Date(firstDay);
      day.setDate(firstDay.getDate() - i);
      days.push({ date: day, isCurrentMonth: false });
    }
  
    for (let i = 0; i < lastDay.getDate(); i++) {
      const day = new Date(firstDay);
      day.setDate(firstDay.getDate() + i);
      days.push({ date: day, isCurrentMonth: true });
    }
  
    const nextMonthDays = 42 - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const day = new Date(lastDay);
      day.setDate(lastDay.getDate() + i);
      days.push({ date: day, isCurrentMonth: false });
    }
  
    return days;
  };
  
  export const isSameDay = (date1, date2) =>
    date1.toDateString() === date2.toDateString();
  