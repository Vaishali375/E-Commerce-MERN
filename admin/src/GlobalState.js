import React, {createContext, useState, useEffect} from 'react'
import UserAPI from './UserAPI';
import axios from './axios';

export const GlobalState = createContext();


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)

    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                try {
                    const res = await axios.get('/admin/refresh_token', {withCredentials: true});
                    //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
                    //res.setHeader('Access-Control-Allow-Credentials', true);
                    //setToken(res.data.accesstoken)
                    console.log(res);
                    setToken(res.data.accesstoken)

                    setTimeout(() =>{
                        refreshToken();
                    }, 10*60*1000)
        
                } catch (error) {
                    if(error.response){
                        console.log(error.response);
                    } else if(error.request){
                        console.log(error.request);
                    } else if(error.message){
                        console.log(error.message);
                    }
                }
               
            }   
        
        refreshToken()   
        }
        
    },[])

    console.log("token: ====>",token);
    
    const state = {
        token: [token, setToken],
        userAPI: UserAPI(token)  
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}