import React, { useState } from 'react';

const DateOfBirth = ({ onChange, error }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleDayChange = (event) => {
    setDay(event.target.value);
    onChange({ day: event.target.value, month, year });
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    onChange({ day, month: event.target.value, year });
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
    onChange({ day, month, year: event.target.value });
  };

  return (
    <div className="form-group">
      <label>Date of Birth:</label>
      <div className="date-picker">
        
        <select id="day" value={day} onChange={handleDayChange}>
          <option value="">Day</option>
          {[...Array(31).keys()].map((day) => (
            <option key={day + 1} value={day + 1}>
              {day + 1}
            </option>
          ))}
        </select>
        <select id="month" value={month} onChange={handleMonthChange}>
          <option value="">Month</option>
          {[...Array(12).keys()].map((month) => (
            <option key={month + 1} value={month + 1}>
              {month + 1}
            </option>
          ))}
        </select>
        <select id="year" value={year} onChange={handleYearChange}>
          <option value="">Year</option>
          {[...Array(100).keys()]
            .map((year) => 2023 - year)
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default DateOfBirth;