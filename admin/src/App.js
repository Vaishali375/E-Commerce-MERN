import React from "react"; 
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './Components/Header';
import Admin from './Components/adminPage/Admin';
import {DataProvider} from "./GlobalState";


function App() {
  return (
    <DataProvider>
      <Router>
           <Route path="/">
               <Header />
               <Admin />
           </Route>   
      </Router>  
      </DataProvider>  
  );
}

export default App;
