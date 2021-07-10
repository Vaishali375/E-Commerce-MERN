import React, { useEffect, useState } from 'react';
import "./Createcat.css"
import { Link, useHistory, useParams } from "react-router-dom";
import axios from '../../axios';

function Createcart() {
    const history = useHistory();
    const param = useParams();
    const initialState = {
        payment_id: '',
        user_email: '',
        items: [],
        address: '',
        amounts: '',
        status: '',
    }
    const [cart, setCart] = useState(initialState);
    const [carts, setCarts] = useState([]);
    const [onEdit, setOnEdit] = useState(false);

    useEffect(() => {

        axios.get("/api/cart").then(response => {
            setCarts(response.data);
        });
    }, []);


    useEffect(() => {
        if (param.id) {
            setOnEdit(true);
            carts.map(cartt => {
                if (cartt._id === String(param.id)) {
                    setCart(cartt);
                }
            });
        } else {
            setOnEdit(false);
            setCart(initialState);
        }
    }, [param.id, carts])

    const onChangeInput = e => {
        const { name, value } = e.target;
        setCart({ ...cart, [name]: value });
    }


    const createCart = async e => {
        e.preventDefault()
        try {
            if (onEdit) {
                await axios.put(`/api/cart/${cart._id}`, { ...cart });
                alert("Cart Successfuly updated!!");
            } else {
                axios.post('/api/cart', { ...cart });
                setCart(initialState);
                alert("Cart Successfuly created!!");

            }
            history.push("/cart");
        } catch (err) {
            console.log(err.response.data.msg);
        }
    }


    return (

        <div className='login'>

            <h3>{onEdit ? "Update Cart" : "Add Cart"}</h3>

            <div className="card cardd">
                <div className="card-body cardBodyy">
                    <form >
                        <div className="form-group">
                            <label for="exampleInputPassword1">Payment id</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Category id"
                                name="payment_id"
                                value={cart.payment_id}
                                onChange={onChangeInput}
                                disabled={onEdit}
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">User Email</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="User Email"
                                name="user_email"
                                value={cart.user_email}
                                onChange={onChangeInput}
                                disabled={onEdit}
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                name="address"
                                value={cart.address}
                                onChange={onChangeInput}
                                disabled={onEdit}
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Amount</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Amount"
                                name="amount"
                                value={cart.amount}
                                onChange={onChangeInput}
                                disabled={onEdit}
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Status</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Status"
                                name="status"
                                value={cart.status}
                                onChange={onChangeInput}
                            />
                        </div>

                        <Link to={"/cart"}><button type="submit" className="btn btn-dark" onClick={createCart}>{onEdit ? "Update" : "Create"}</button></Link>
                        <br />
                        <br />
                        <Link to={"/cart"}><button type="submit" className="btn btn-dark">Cancel</button></Link>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Createcart