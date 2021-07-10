import React, { useState, useEffect, useContext } from 'react';
import axios from '../../axios';
import { Link } from "react-router-dom";
import { GlobalState } from '../../GlobalState';

function Cart() {
  const [history, setHistory] = useState([]);
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const email = state.userAPI.user;


  useEffect(() => {
    axios.get("/api/cart").then(response => {
      setHistory(response.data);
      console.log(response.data);
    });
  }, [history]);


  return (
    <div>
      <div style={{ padding: "30px" }}>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Payment_id</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Quantity</th>
              <th scope="col">amount</th>
              <th scope="col">status</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              {isAdmin ?
                <th scope="col">#</th> :
                ""
              }

            </tr>
          </thead>
          {isAdmin ?
            history.map(order => (
              <tbody>
                <tr>
                  <th scope="row">{order.payment_id}</th>
                  <td>{order.user_email}</td>
                  <td>{order.address}</td>
                  <td>{order.items.length}</td>
                  <td>{order.amount}</td>
                  <td>{order.status}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.updatedAt}</td>
                  {isAdmin ?
                    <td><Link to={`/update_cart/${order._id}`}>
                      <button class="btn btn-outline-danger">Edit</button>
                    </Link></td>
                    : ""
                  }
                </tr>
              </tbody>
            )) :

            history.map(order => ((order.user_email === email) ?
              <tbody>
                <tr>
                  <th scope="row">{order.payment_id}</th>
                  <td>{order.user_email}</td>
                  <td>{order.address}</td>
                  <td>{order.items.length}</td>
                  <td>{order.amount}</td>
                  <td>{order.status}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.updatedAt}</td>
                  {isAdmin ?
                    <td><Link to={`/update_cart/${order._id}`}>
                      <button className="btn btn-outline-danger">Edit</button>
                    </Link></td>
                    : ""
                  }
                </tr>
              </tbody> :
              ""
            ))

          }

        </table>


      </div>
    </div>
  )
}

export default Cart