import React, { useContext, useEffect, useState } from 'react';
import "./Item.css";
import { GlobalState } from '../../GlobalState';
import axios from "../../axios";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";



function UserCart() {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [cart, setCart] = state.userAPI.cart;
    const email = state.userAPI.user;
    const [subtotal, setSubtotal] = useState(0);

    const stripe = useStripe();
    const elements = useElements();
    


    useEffect(() => {
        const getSubtotal = () => {
            const subtotal = cart.reduce((prev, item) => {
                return prev + (item.price? item.price * item.quantity: item.product_price * item.quantity)
            }, 0)

            setSubtotal(subtotal)
        }
        getSubtotal();
    }, [cart])

    const addToCart = async (cart) => {
        await axios.patch("/admin/addCart", { cart }, {
            headers: { Authorization: token }
        })
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item.id === id || item._id===id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const increment = (id) => {
        cart.forEach(item => {
            if (item.id === id || item._id===id) {
                item.quantity += 1;
            }
        })
        setCart([...cart])
        addToCart(cart)
    }

    const DeleteProduct = (id) => {
        if (window.confirm("Do you want to delete this product from Cart?")) {
            cart.forEach((item, index) => {
                if (item.id === id || item._id===id) {
                    cart.splice(index, 1);
                }
            })

            setCart([...cart])
            addToCart(cart)
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            console.log("token generated!", paymentMethod);
            try {
                const { id } = paymentMethod;
                const response = await axios.post( "/api/cart",
                    {
                        payment_id: id,
                        amount: subtotal,
                        user_email: email,
                        address: '123 React Lane',
                        items: cart,
                        status: 'not delivered'
                    },
                    {headers: {Authorization: token}
                });

                console.log("data", response.data.success);
                if (response.data.success) {
                    console.log(" payment successful!");
                    setCart([]);
                    addToCart([]);
                    alert("you have Successfully placed an order.");
                }
            } catch (error) {
                console.log("error: ", error);
            }
        } else {
            console.log(error.message);
        }
    };

    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "3rem" }}>Cart Empty</h2>
    return (
        <div>
            <div className="cart1">
                {
                    cart.map(props => (
                        <div className="userCart1" key={props.id? props.id: props._id}>
                            <div  className="card userCart2" >
                                <img src={props.img? props.img: props.product_images.url} className="card-img-top  cat_img2" alt="..." />
                                <div className="card-body ">
                                    <h2 className="card-title">{props.title? props.title: props.product_name}</h2>
                                    <p className="card-title">ID: {props.product_id? props.product_id: props._id}</p>
                                    <p className="card-text">{props.description? props.description: props.product_description}</p>
                                    <h5 className="card-text">$ {props.price? props.price * props.quantity : props.product_price*props.quantity}</h5>
                                    <div className="cartQuantity">
                                        <button className="cartBtn cartBtn1" onClick={() => decrement(props.id? props.id: props._id)}> - </button>
                                        <span>{props.quantity}</span>
                                        <button className="cartBtn cartBtn2" onClick={() => increment(props.id? props.id: props._id)}> + </button>

                                        <button className="cartBtn3" onClick={() => DeleteProduct(props.id? props.id: props._id)}>Delete</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
            <div className="cartTotal">
                <div className="payment__container">
                    {/* Payment section - delivery address */}
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Delivery Address</h3>
                        </div>
                        <div className="payment__address">
                            <p>{email}</p>
                            <p>123 React Lane</p>
                            <p>Ahemdabad</p>
                        </div>
                    </div>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Payment Method</h3>
                        </div>
                        <div className="payment__details">
                             <h6>Total Amount: $ {subtotal}</h6>
                            <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                                <CardElement />
                                <button style={{paddingTop: 2, paddingBottom: 2}} className="btn btn-primary">
                                    Pay
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCart
