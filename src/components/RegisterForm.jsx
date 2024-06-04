import React, { useState } from 'react'
import './RegisterForm.css'
import axios from 'axios'

function RegisterForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [password, setPassword] = useState('')
  // const navigate = useNavigat

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8000/api/users/register', {
        firstName,
        lastName,
        phone,
        email,
        address,
        city,
        password,
      })
      .then((res) => {})
  }

  return (
    <div className="formbox">
      <form id="registerForm">
        <div className="inputbox">
          <input type="text" required />
          <label htmlFor="">First Name:</label>
        </div>
        <div className="inputbox">
          <input type="text" required />
          <label htmlFor="">Last Name:</label>
        </div>
        <div className="inputbox">
          <input type="Number" required />
          <label htmlFor="">Phone Number:</label>
        </div>
        <div className="inputbox">
          <input type="email" required />
          <label htmlFor="">Email:</label>
        </div>
        <div className="inputbox">
          <input type="text" required />
          <label htmlFor="">Address:</label>
        </div>
        <div className="inputbox">
          <input type="text" required />
          <label htmlFor="">City:</label>
        </div>
        <div className="inputbox">
          <input type="password" required />
          <label htmlFor="">Password:</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default RegisterForm
