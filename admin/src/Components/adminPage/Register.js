import React, {useState} from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import axios from '../../axios'

function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/admin/register', {...user})

            localStorage.setItem('firstLogin', true)

            alert("Registration Successful")
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login">
             <h1>Registration</h1>
             <div className="card">
                <div className="card-body">
                  <form onSubmit={registerSubmit}>
                    <div className="form-group">
                       <label for="exampleInputEmail1">Name</label>
                       <input 
                           type="text" 
                           className="form-control" 
                           name = "name"
                           value={user.name}
                           onChange={onChangeInput}
                           />
                    </div>
                    <div className="form-group">
                       <label for="exampleInputEmail1">Email address</label>
                       <input 
                           type="email" 
                           className="form-control" 
                           name = "email"
                           value={user.email}
                           onChange={onChangeInput}
                           />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        name = "password"
                        value={user.password}
                        onChange={onChangeInput}
                        />
                    </div>
  
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <Link to="/login">
                      <button className="btn btn-primary">Login</button>
                  </Link>
                 </form>
                </div>
             </div>
        </div>
    )
}

export default Register