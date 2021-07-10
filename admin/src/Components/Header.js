import React, { useContext} from 'react';
import {Link} from 'react-router-dom';
import "./adminPage/Header.css";
import Carticon from "./cart.png";
import axios from "../axios";
import {GlobalState} from '../GlobalState';


function Header() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;

    const logoutUser = async () =>{
        await axios.get('/admin/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const loggedRouter = () =>{
        return(
            <>
                <Link to="/" onClick={logoutUser}>
                    <h4 className="option">Logout</h4>
                </Link>
            </>
        )
    }

   
    
    return (
        <div className="header">
           <a href="/" className="option">
               <h1>{isAdmin? "Admin" : "My Cart" }</h1>
           </a>
            
            {isAdmin? 
                <div className="headerLink">
                 <Link to="/">
                     <h4 className="option">Category</h4>
                </Link>
                <Link to="/product">
                     <h4 className="option">Product</h4>
                </Link> 
                <Link to="/" onClick={logoutUser}>    
                   <h4 className="option">Logout</h4>
                </Link>    
                <Link to="/cart">    
                   <h4 className="option">Cart</h4>
                </Link>     
                 
            </div> :
            <div className="headerLink">
                 <Link to="/product">
                     <h4 className="option">All Product</h4>
                </Link> 
                {
                    isLogged ?
                    <Link to="/cart">    
                         <h4 className="option">History</h4>
                    </Link>:
                    ""
                }
                {
                    isLogged ? 
                    loggedRouter(): 
                    <Link to="/login">
                       <h4 className="option">Login/Register</h4>
                    </Link>
                }   
                
                <div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/userCart">
                        <img src={Carticon} alt="" width="40" />
                    </Link>
                </div>   
                 
            </div> 

            }
        </div>
    )
}

export default Header
