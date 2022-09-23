import React from 'react'
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login">
        <div>
            <form className="login-form">
              <h2>Login Here</h2>
              <label>Email:</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus/>
              <br/>
              <label>Password:</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </form>
            <button type="submit" className="submit-btn">Submit</button>
        </div>
    </div>
  )
}

export default Login