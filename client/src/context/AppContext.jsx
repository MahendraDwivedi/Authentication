import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AppContent = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

    const getAuthState = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth');
            if(data.success){
                setIsLoggedIn(true);
                getUserData()
            }
        } catch (error) {
            toast.error("Error fetching auth state");
            // console.log("unable to fetch auth state");
        }
    }
    const getUserData = async () => {
        try {
            console.log("getting user data");
            
            const {data} = await axios.get(backendUrl + '/api/user/data');
            console.log(data);
            
            data.success ? setUserData(data.userData):toast.error(data.message);
        } catch (error) {
            toast.error("Error fetching user data1");
            // console.log("unable to fetch user data");
            
        }
    }

    useEffect(()=>{
        getAuthState();
    },[])
    const value = {
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,getUserData
    }
    return(
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}