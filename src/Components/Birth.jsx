import React, { useState, useEffect } from 'react';

const DateOfBirth = ({ onChange, error }) => {
  const [date, setDate] = useState({
    day: '',
    month: '',
    year: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate((prevDate) => ({
      ...prevDate,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { day, month, year } = date;

    if (day && month && year) {
      const daysInMonth = new Date(year, month, 0).getDate();

      if (day > daysInMonth) {
        onChange({ error: `Invalid date: ${day}/${month}/${year}. This month has only ${daysInMonth} days.` });
      } else {
        onChange({ day, month, year });
      }
    } else {
      onChange({ error: 'Please fill in all fields for date of birth.' });
    }
  }, [date, onChange]);

  return (
    <div className="form-group">
      <label>Date of Birth:</label>
      <div className="date-picker">
        <select
          name="day"
          id="day"
          value={date.day}
          onChange={handleChange}
          aria-label="Day"
        >
          <option value="">Day</option>
          {[...Array(31).keys()].map((d) => (
            <option key={d + 1} value={d + 1}>
              {d + 1}
            </option>
          ))}
        </select>
        <select
          name="month"
          id="month"
          value={date.month}
          onChange={handleChange}
          aria-label="Month"
        >
          <option value="">Month</option>
          {[...Array(12).keys()].map((m) => (
            <option key={m + 1} value={m + 1}>
              {m + 1}
            </option>
          ))}
        </select>
        <select
          name="year"
          id="year"
          value={date.year}
          onChange={handleChange}
          aria-label="Year"
        >
          <option value="">Year</option>
          {[...Array(20).keys()]
            .map((y) => 2024 - y)
            .map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
        </select>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default DateOfBirth;
