import axios from 'axios';

import React, { useState } from 'react';
import DateOfBirth from './Birth';
import Gender from './Gender';


function SignUpForm() {
    const [form, setForm] = useState({
        firstName: "",
        surname: "",
        emailOrMobile: "",
        password: ""
    });


    const [loading, setLoading] = useState(false);



    const [dateOfBirth, setDateOfBirth] = useState({ day: '', month: '', year: '' });

    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleDateOfBirthChange = (date) => {
        if (date.error) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dateOfBirth: date.error,
            }));
        } else {
            setErrors((prevErrors) => {
                const { dateOfBirth, ...rest } = prevErrors;
                return rest;
            });
            setDateOfBirth(date);
        }
    };

    const handleGenderChange = (gender) => {
        setGender(gender);
    };

   
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const newErrors = {};
    
        // Validate form fields
        if (form.password.length < 4) {
            newErrors.password = 'Password must be at least 4 chars long';
        }
    
        if (!dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year) {
            newErrors.dateOfBirth = 'Invalid Date, please select a valid date';
        }
    
        if (!form.emailOrMobile) {
            newErrors.emailOrMobile = 'Enter Mobile Number or Email Address';
        }
    
        if (!gender) {
            newErrors.gender = 'Please choose a gender';
        }
    
        // Set errors
        setErrors(newErrors);
    
        // If no errors, proceed with form submission
        if (Object.keys(newErrors).length === 0) {
            try {
                const { surname, emailOrMobile, firstName, password } = form;
                const date = `${dateOfBirth.day}/${dateOfBirth.month}/${dateOfBirth.year}`;
                const url = 'http://localhost:3000/api/v1/create-account';
    
                const { data } = await axios.post(url, {
                    surname, emailOrMobile, firstName, password, date, gender
                });
    
                if (data.status === 200) {
                    // Reset form
                    setForm({
                        firstName: "",
                        surname: "",
                        emailOrMobile: "",
                        password: ""
                    });
                    alert(data.message);
                    window.location.reload()
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error creating account:", error);
                alert("An error occurred while creating the account. Please try again.");
            }
        }
    
        setLoading(false);
    };
    

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='name-section'>
                    <div className="form-group">
                        <input
                            type="text"
                            name='firstName'
                            id="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder='First Name'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="surname"
                            placeholder='Last Name'
                            name='surname'
                            value={form.surname}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        id="emailOrMobile"
                        placeholder='Enter Mobile number or email address:'
                        name='emailOrMobile'
                        value={form.emailOrMobile}
                        onChange={handleChange}
                    />
                </div>
                {errors.emailOrMobile && <p className='error'>{errors.emailOrMobile}</p>}
                <div className="form-group">
                    <input
                        type="password"
                        placeholder='Password must be at least 4 chars long:'
                        id="password"
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                {errors.password && <p className='error'>{errors.password}</p>}
                <DateOfBirth
                    onChange={handleDateOfBirthChange}
                    error={errors.dateOfBirth}
                />
                <Gender
                    onChange={handleGenderChange}
                    error={errors.gender}
                />
                <p className='Policy'>
                    By clicking Sign Up, you agree to our User Agreement, Privacy Policy, and
                    Cookie Policy.
                </p>
                <div className='buttons'>
                    <button type="submit">{loading ? `loading..` : `Sign Up`}</button>
                    <button type="button">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;