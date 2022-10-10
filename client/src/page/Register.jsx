import React from "react";

const Register = () => {
  return (
    <section>
      <div className="App-header">
        <h1>Register</h1>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" />
          <br />
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" />
          <br />
          <label htmlFor="email">Email:</label>
          <input type="email" />
          <br />
          <label htmlFor="password">Password:</label>
          <input type="password" />
          <br />
          <button>Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
