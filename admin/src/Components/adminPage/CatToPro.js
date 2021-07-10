import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import "./Item.css";
import { GlobalState } from '../../GlobalState';

function CatToPro() {
    const state = useContext(GlobalState);
    const addCart = state.userAPI.addCart;
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get("/api/products").then(response => {
            setProduct(response.data);
        });
    }, [product]);

    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);


    return (

        <div className='categoryouter'>
            <div className="container">
                <div className="cr row">
                    {product.map(props => ((props.cat_id === id) ?
                        <div className="cc col-sm-3" key={props._id} >
                            <div className="card cat" >
                                <img src={props.product_images.url} className="card-img-top cat_img" alt="..." />
                                <div className="card-body cat_body">
                                    <p className="card-title">ID: {props.product_id}</p>
                                    <p className="card-title">category_id :{props.cat_id}</p>
                                    <h3 className="card-title">{props.product_name}</h3>
                                    <p className="card-text description">{props.product_description}</p>
                                    <p className="card-text">Price : $ {props.product_price}</p>
                                    <div className="card_button">
                                        <Link to={`/product/${id}`}>
                                            <button className="btn btn-outline-danger" onClick={() => addCart(props)}>Add to Cart</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        ""
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CatToPro
