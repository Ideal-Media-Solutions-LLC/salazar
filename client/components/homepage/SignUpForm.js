import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const SignUpForm = function () {

  const options = [
    { label: "one", value: 1, disabled: true },
    { label: "two", value: 2 }
  ];
  const defaultOption = options[0];



  return (
    <form>
      <h3>Sign Up</h3>

      <div className="form-group">
        <label>Email</label>
        <input type="text" className="form-control" placeholder="Email" />
      </div>

      <div className="form-group">
        <label>User name</label>
        <input type="text" className="form-control" placeholder="First name" />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="text" className="form-control" placeholder="Enter password" />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input type="email" className="form-control" placeholder="Enter password" />
      </div>

      <div>
        <Dropdown options={options} value={defaultOption} placeholder="Select an option" />
      </div>

      <button type="submit" className="btn btn-primary btn-block">Sign Up</button>

    </form>
  )

};

export default SignUpForm;