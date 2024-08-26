import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek, isBefore, parse } from 'date-fns';
import Modal from './Modal';

const CalendarGrid = ({ currentWeek, days }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const [copySourceDay, setCopySourceDay] = useState(null);
  const [isCopyModalVisible, setCopyModalVisible] = useState(false);
  const [targetDays, setTargetDays] = useState(days);

  const handleButtonClick = (shift) => {
    setSelectedShift(shift);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    if (selectedShift) {
      const selectedEmployeeIds = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.id.split('-')[1]);
      setSelectedEmployees(prevState => ({
        ...prevState,
        [selectedShift.name]: {
          ...prevState[selectedShift.name],
          [selectedShift.day]: selectedEmployeeIds.map(id => employees.find(employee => employee.id === parseInt(id)))
        }
      }));
    }
    setSelectedShift(null);
  };

  const handleRemoveEmployee = (shiftName, day, employeeId) => {
    setSelectedEmployees(prevState => {
      const updatedShift = prevState[shiftName][day].filter(employee => employee.id !== employeeId);
      return {
        ...prevState,
        [shiftName]: {
          ...prevState[shiftName],
          [day]: updatedShift
        }
      };
    });
  };

  const handleCopySchedule = () => {
    setCopyModalVisible(true);
  };

  const handleConfirmCopy = () => {
    if (copySourceDay) {
      setSelectedEmployees(prevState => {
        const updatedEmployees = { ...prevState };
        shifts.forEach(shift => {
          if (prevState[shift.name] && prevState[shift.name][copySourceDay]) {
            targetDays.forEach(targetDay => {
              if (!updatedEmployees[shift.name]) {
                updatedEmployees[shift.name] = {};
              }
              updatedEmployees[shift.name][targetDay] = [...prevState[shift.name][copySourceDay]];
            });
          }
        });
        return updatedEmployees;
      });
      setCopySourceDay(null);
      setCopyModalVisible(false);
    }
  };

  const isPastDate = (day) => {
    const today = new Date();
    const date = parse(day.split(' - ')[1], 'dd/MM', new Date());
    return isBefore(date, today);
  };

  const shifts = [
    { name: 'Ca 1', time: '07:00 - 15:00' },
    { name: 'Ca 2', time: '15:00 - 23:00' },
    { name: 'Ca Gãy Sáng', time: '07:00 - 11:00' },
    { name: 'Ca Gãy Tối', time: '17:00 - 23:00' },
  ];

  const employees = [
    { id: 1, name: 'Nguyen Van A', position: 'Lễ tân' },
    { id: 2, name: 'Tran Thi B', position: 'Phục vụ' },
    { id: 3, name: 'Le Van C', position: 'Lễ tân' },
    { id: 4, name: 'Pham Thi D', position: 'Phục vụ' },
    { id: 5, name: 'Nguyen Van E', position: 'Lễ tân' },
    { id: 6, name: 'Tran Thi F', position: 'Phục vụ' }
  ];

  return (
    <div className="grid grid-cols-8 gap-2">
      <div className="col-span-1 flex flex-col">
        {/* Dropdown chức vụ */}
        <select className="border p-2 rounded mb-2 w-full">
          <option>Lễ tân</option>
          <option>Phục vụ</option>
        </select>
        {shifts.map((shift, index) => (
          <div key={index} className="border-2 p-4 rounded flex-grow flex items-center justify-center mb-2">
            <p className="font-bold">{shift.name}</p>
            <p>{shift.time}</p>
          </div>
        ))}
      </div>
      <div className="col-span-7 grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const pastDate = isPastDate(day);
          return (
            <div key={index} className={`border p-2 rounded flex flex-col ${pastDate ? 'bg-gray-300' : ''}`}>
              <p className="font-bold mb-2">{day}</p>
              <button className="bg-blue-500 text-white p-2 rounded mb-2" onClick={() => { setCopySourceDay(day); handleCopySchedule(); }} disabled={pastDate}>Copy</button>
              {shifts.map((shift, shiftIndex) => (
                <div key={shiftIndex} className="flex-grow min-h-40 border-dashed border-2 rounded mb-2 flex flex-col items-center justify-center">
                  <button className="border border-dashed rounded p-2 mb-2 mt-2" onClick={() => handleButtonClick({ ...shift, day })} disabled={pastDate}>+</button>
                  <div className="max-h-20 overflow-y-auto min-w-full">
                    {selectedEmployees[shift.name] && selectedEmployees[shift.name][day] && (
                      <div className="mt-2">
                        {selectedEmployees[shift.name][day].map(employee => (
                          <div key={employee.id} className={`mb-2 p-1 rounded flex justify-between items-center ${employee.position === 'Lễ tân' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'}`}>
                            <span>{employee.name}</span>
                            <button className="ml-2 text-black" onClick={() => handleRemoveEmployee(shift.name, day, employee.id)} disabled={pastDate}>X</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4">Select Employees for {selectedShift?.name}</h2>
          <div className="mb-4">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center mb-2">
                <input type="checkbox" id={`employee-${employee.id}`} className="mr-2" />
                <label htmlFor={`employee-${employee.id}`}>{employee.name} - {employee.position}</label>
              </div>
            ))}
          </div>
          <button className="bg-blue-500 text-white p-2 rounded" onClick={handleCloseModal}>Confirm</button>
        </Modal>

        <Modal isVisible={isCopyModalVisible} onClose={() => setCopyModalVisible(false)}>
          <h2 className="text-xl font-bold mb-4">Sao chép từ ngày {copySourceDay}</h2>
          <div className="mb-4 grid grid-cols-2 gap-4">
            {days.map((day, index) => {
              const pastDate = isPastDate(day);
              return (
                <div key={index} className="flex items-center mb-2">
                  <input type="checkbox" id={`day-${index}`} className="mr-2" checked={targetDays.includes(day)} onChange={(e) => {
                    if (e.target.checked) {
                      setTargetDays([...targetDays, day]);
                    } else {
                      setTargetDays(targetDays.filter(d => d !== day));
                    }
                  }} disabled={pastDate} />
                  <label htmlFor={`day-${index}`}>{day}</label>
                </div>
              );
            })}
          </div>
          <button className="bg-blue-500 text-white p-2 rounded" onClick={handleConfirmCopy}>Xác nhận</button>
        </Modal>
      </div>
    </div>
  );
};

export default CalendarGrid;