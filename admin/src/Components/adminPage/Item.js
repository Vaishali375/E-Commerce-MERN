import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import "./Item.css";
import { useHistory} from 'react-router-dom';
import {GlobalState} from '../../GlobalState';

function Item(props) {
  const history = useHistory();
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin; 
  const addCart = state.userAPI.addCart;
  
  

  const onDelete = async e => {
    e.preventDefault()
    try {
      if(props.price){
        await axios.delete(`api/products/${props.id}`);
        alert('Successfully Deleted!!');
        history.push("/product");
      }else{
        await axios.delete(`api/category/${props.id}`);
        alert('Successfully Deleted!!');
        history.push("/category");
      }
      
    } catch (err) {
      alert(err.response.data.msg);
    }
  }


  return (
    <div>
      <div className="card cat" >
        <img src={props.img} className="card-img-top cat_img" alt="..." />
        <div className="card-body cat_body">
          <p className="card-title">ID: {props._id}</p>
          <p className="card-title">{props.category_id ? "category_id :":""}{props.category_id}</p>
          <h3 className="card-title">{props.title}</h3>
          <p className="card-text description">{props.description}</p>
          <p  className="card-text">{props.price ? "Price : $ " : ""}{props.price}</p>
          {isAdmin ? 
          <div className="card_button">
            <button className="btn btn-danger" onClick={onDelete}>Delete</button>
            {props.price ? 
            <Link to={`/update_pro/${props.id}`}>
              <button className="btn btn-outline-danger">Edit</button>
            </Link> :
            <Link to={`/update_cat/${props.id}`}>
              <button className="btn btn-outline-danger">Edit</button>
            </Link>
            }
          </div>:
          <div className="card_button">
          {props.price ? 
          
            <Link to="/product">
              <button className="btn btn-outline-danger" onClick={() => addCart(props)}>Add to Cart</button>
            </Link>
            
             :
            <Link to={`/product/${props._id}`}>
              <button  className="btn btn-outline-danger">View Products</button>
            </Link>
            }
          </div>
          }
        </div>
      </div>

    </div>
  )
}

export default Item