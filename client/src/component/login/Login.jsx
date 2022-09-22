import React from 'react'

const Login = () => {
  return (
    <div>
        <h2>Login</h2>
        <div>
            <form>
                <label>Email:</label>
                <input type="text" autoFocus/>
            </form>
            <form>
                <label>Password:</label>
                <input type="text"/>
            </form>
            <button>Submit</button>
        </div>
    </div>
  )
}

export default Login