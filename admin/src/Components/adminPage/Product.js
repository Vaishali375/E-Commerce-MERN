import React, { useEffect, useState, useContext } from 'react';
import Item from './Item';
import './Category.css';
import axios from '../../axios';
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState';

function Product() {
    const [product, setProduct] = useState([]);
    const state = useContext(GlobalState);

    const [isAdmin] = state.userAPI.isAdmin;

    useEffect(() => {
        axios.get("/api/products").then(response => {
            setProduct(response.data);
        });
    }, [product]);

    return (
        <div className='categoryouter'>
            <div className="cat_heading">
                <h1>Product</h1>
                {isAdmin ?
                    <Link to="/create_pro">
                        <button type="button" className="btn btn-primary createbtn">create new</button>
                    </Link> :
                    ""
                }
            </div>
            <div className="container">
                <div className="cr row">
                    {product.map((pro, index) => (
                        <div className="cc col-sm-3" >
                            <Item id={pro._id} title={pro.product_name} img={pro.product_images.url}
                                _id={pro.product_id} category_id={pro.cat_id} price={pro.product_price} description={pro.product_description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Product
