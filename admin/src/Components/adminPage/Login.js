import React, { useState } from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import axios from '../../axios';

function Login() {
   const [user, setUser] = useState({
      email:'', password:''
   });

   const onChangeInput = e => {
      const {name, value} = e.target;
      setUser({...user,[name]:value})
   }

   const loginSubmit = async e => {
      e.preventDefault()
      try {
           await axios.post('/admin/login', {...user});
           localStorage.setItem('firstLogin', true)
           alert("You are successfully logged in!!");
           window.location.href = "/";
      } catch (err) {
         alert(err.response.data.msg);
      }
   }

    return (
        <div className="login">
             <h1>login</h1>
             <div className="card">
                <div className="card-body">
                  <form onSubmit={loginSubmit}>
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
                    <div class="form-group">
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
                  <Link to="/register">
                      <button  className="btn btn-primary">Register</button>
                  </Link>
                 </form>
                </div>
             </div>
        </div>
    )
}

export default Login;
