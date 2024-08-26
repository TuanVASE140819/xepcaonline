import React from 'react';

const CalendarControls = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <span className="text-red-500">X: Nghỉ</span>
        <span className="ml-4">Duộc nhờ làm thêm</span>
      </div>
      <button className="bg-blue-500 text-white p-2 rounded">Sao Chép</button>
    </div>
  );
};

export default CalendarControls;
