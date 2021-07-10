import React from "react";
import {Route, Switch } from 'react-router-dom';
import Login from './Login';
import Category from './Category';
import Createcat from './Createcat';
import Product from './Product';
import Createpro from './Createpro';
import Cart from './Cart';
import Createcart from './Createcart';
import CatToPro from "./CatToPro";
import Register from "./Register";
import UserCart from "./UserCart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";



function Admin() {
     const PUBLIC_KEY = "pk_test_51JAqtfSFU5nyeVy32rKXcQ6oNs8j9ivBrKmSxZVb63ciT1IokGgqAkMUpbIg3oQsdaUpOgw4QMmutI8YV2v1DFiI00RS3D8tsw";

     const stripeTestPromise = loadStripe(PUBLIC_KEY);
     return (


          <Switch>
               <Route path="/" exact component={Category} />

               <Route path="/product" exact component={Product} />

               <Route path="/product/:id" exact component={CatToPro} />

               <Route path="/login" exact component={Login} />

               <Route path="/register" exact component={Register} />

               <Route path="/create_cat" exact component={Createcat} />

               <Route path="/update_cat/:id" exact component={Createcat} />

               <Route path="/create_pro" exact component={Createpro} />

               <Route path="/update_pro/:id" exact component={Createpro} />

               <Route path="/cart" exact component={Cart} />

               <Route path="/create_cart" exact component={Createcart} />

               <Route path="/update_cart/:id" exact component={Createcart} />

               <Elements stripe={stripeTestPromise}>
                    <Route path="/userCart" exact component={UserCart} />
               </Elements>

          </Switch>

     );
}

export default Admin;
