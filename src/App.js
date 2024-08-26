import React, { useState } from 'react';
import CalendarHeader from './components/CalendarHeader';
import CalendarControls from './components/CalendarControls';
import CalendarGrid from './components/CalendarGrid';
import { startOfWeek } from 'date-fns';

function App() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [days, setDays] = useState([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lịch làm việc</h1>
      <CalendarHeader setDays={setDays} />
      <CalendarControls />
      <CalendarGrid currentWeek={currentWeek} days={days} />
    </div>
  );
}

export default App;