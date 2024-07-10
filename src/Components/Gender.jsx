import React, { useState } from 'react';

const Gender = ({ onChange, error }) => {
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor="gender">Please choose a gender. You can change who can see this leter</label>
      <div className="gender-options">
        <div className='checked'>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={selectedGender === 'female'}
            onChange={handleGenderChange}
          />
          <label htmlFor="female">Female</label>
        </div>
        <div className='checked'>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={selectedGender === 'male'}
            onChange={handleGenderChange}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div className='checked'>
          <input
            type="radio"
            id="custom"
            name="gender"
            value="custom"
            checked={selectedGender === 'custom'}
            onChange={handleGenderChange}
          />
          <label htmlFor="custom">Custom</label>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Gender;