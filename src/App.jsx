import React, { useState } from 'react';

import DateOfBirth from './Components/Birth';
import Gender from './Components/Gender';

function App() {
  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    email_Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...setForm,
      [name]: value,
    });
  };


  const [dateOfBirth, setDateOfBirth] = useState({});
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});

  console.log(errors);
  const handleDateOfBirthChange = (dateOfBirth) => {
    setDateOfBirth(dateOfBirth);
  };

  const handleGenderChange = (gender) => {
    setGender(gender);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    if (!dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year) {
      errors.dateOfBirth = 'Invalid Date, please select a valid date';
    }

    if (!form.email_Password) {
      errors.email_Password = 'Enter Mobile Number & Email Address';
    }

    if (!gender) {
      errors.gender = 'Please choose a gender';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Perform form submission here (e.g., send data to a server)
      console.log(
        `First Name: ${firstName}, Surname: ${surname}, Email: ${email}, Password: ${password}, Date of Birth: ${dateOfBirth.day}/${dateOfBirth.month}/${dateOfBirth.year}, Gender: ${gender}`
      );
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className='name-section'>

          <div className="form-group">
            <input
              type="text"
              id="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder='First Name '
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="surname"
              placeholder='Last Name '

              value={form.surname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder='Enter Mobile number or email address:'

            value={form.email}
            onChange={handleChange}
          />
        </div>
        {errors.email_Password && <p className='error'>{errors?.email_Password}</p>}
        <div className="form-group">
          <input
            type="password"
            placeholder='Password must be at least 4 chars long:'
            id="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <DateOfBirth
          // onChange={handleDateOfBirthChange}
          error={errors.dateOfBirth}
        />
        <Gender
          // onChange={handleGenderChange}
          error={errors.gender}
        />
        <p className='Policy'>
          By clicking Sign Up, you agree to our User Agreement, Privacy Policy, and
          Cookie Policy.
        </p>
        <div className='buttons'>
          <button type="submit">Sign Up</button>
          <button type="button">Cancel</button>

        </div>
      </form>
    </div>
  );
}

export default App;