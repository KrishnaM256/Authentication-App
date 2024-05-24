import React from 'react'

function RegisterForm() {
  return (
    <form id="registerForm">
      <input type="text" placeholder="Name" required />
      <input type="text" placeholder="Phone Number" required />
      <input type="text" placeholder="Email" required />
      <input type="text" placeholder="Address Line 1" required />
      <input type="text" placeholder="Address Line 2 (optional)" />
      <input type="text" placeholder="city" required />
      <button type="submit">Submit</button>
    </form>
  )
}

export default RegisterForm
