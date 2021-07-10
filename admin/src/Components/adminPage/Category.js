import React, { useEffect, useState, useContext } from 'react';
import Item from './Item';
import './Category.css';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';


function Category() {
    const [category, setCategory] = useState([]);
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;

    useEffect(() => {
        axios.get("/api/category").then(response => {
            setCategory(response.data);
        });
    }, [category]);


    return (
        <div className='categoryouter'>
            <div className="cat_heading">
                <h1>Category</h1>
                {isAdmin ?
                    <Link to="/create_cat">
                        <button type="button" className="btn btn-primary createbtn">create new</button>
                    </Link> :
                    ""
                }

            </div>
            <div className="container">
                <div className="cr row">
                    {category.map((cat, index) => (
                        <div className="cc col-sm-3" >
                            <Item id={cat._id} title={cat.cat_name} img={cat.cat_images.url}
                                _id={cat.cat_id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Category