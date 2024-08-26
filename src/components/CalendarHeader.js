import React, { useState, useEffect } from 'react';

const getDaysOfWeek = (startDate) => {
  const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const days = [];

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startDate);
    currentDay.setDate(startDate.getDate() + i);
    const formattedDate = `${daysOfWeek[currentDay.getDay()]} - ${currentDay.getDate().toString().padStart(2, '0')}/${(currentDay.getMonth() + 1).toString().padStart(2, '0')}`;
    days.push(formattedDate);
  }

  return days;
};

const CalendarHeader = ({ setDays }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  useEffect(() => {
    setDays(getDaysOfWeek(currentWeekStart));
  }, [currentWeekStart, setDays]);

  const handlePreviousWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newStartDate);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newStartDate);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <select className="border p-2 rounded">
        <option>Test_Thọ Cafe 1</option>
        {/* Add more options here */}
      </select>
      <div className="flex items-center">
        <button className="border p-2 rounded" onClick={handlePreviousWeek}>Tuần trước</button>
        <button className="border p-2 rounded mx-2" onClick={handleNextWeek}>Tuần tốt</button>
        <input
  type="date"
  value={currentWeekStart.toISOString().split('T')[0]}
  onChange={(e) => setCurrentWeekStart(new Date(e.target.value))}
//   min={new Date().toISOString().split('T')[0]}
/>
      </div>
      <div className="ml-4">
        <span className="font-semibold">Số ca: 0</span>
      </div>
    </div>
  );
};

export default CalendarHeader;