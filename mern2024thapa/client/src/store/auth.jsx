//understanding the code using chatGPT
import { createContext, useContext, useEffect, useState } from "react"; // These are part of the React Context API and are used for creating and consuming contexts

export const AuthContext = createContext();       //Creating a new context named AuthContext using createContext(). This context will serve as a global store for storing data that needs to be shared across components in your application.


///now i make provider 
/*
AuthProvider is a functional component that serves as a provider for the AuthContext. It takes a children prop, which represents the child components that will be wrapped by this provider.
Inside the provider, there is a function storeTokenInLS that stores a token in the browser's local storage. This function is included in the value provided by the context, making it accessible to components that consume this context.
The value prop of AuthContext.Provider is set to an object with storeTokenInLS as a property, making it available to consuming components
*/
export const AuthProvider = ({children}) => {
    
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");

    const storeTokenInLS =(serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token', serverToken);
    };

    //   this is the get the value in either true or false in the original state of token
    let isLoggedIn = !!token;
    console.log("token", token);
    console.log("isLoggedin ", isLoggedIn);

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    //JWT authentication – to get currently logged in user data 
    
    const userAuthentication = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

            if(response.ok){
                const data = await response.json();
                console.log("user data", data.userData);
                setUser(data.userData);
            }
        } catch (error) {
            console.log("error fetching user data");
        }
    }

    useEffect(() => {
        userAuthentication();
    },[]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user}}>
          {children}
        </AuthContext.Provider>
      );
};

/*
useAuth is a custom hook that uses the useContext hook to access the value provided by the AuthContext.
It checks if authContextValue is falsy (which would happen if useAuth is used outside of the AuthProvider). If it's used outside the provider, an error is thrown.
If used within the provider, it returns the authContextValue, which includes the storeTokenInLS function
*/
export const useAuth =() =>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of provider");
    }
    return authContextValue;
};

/*
In summary, this code sets up a context (AuthContext) to store shared data and provides a provider (AuthProvider) that wraps components to make the context available.
 The useAuth hook is designed to be used within components to conveniently access the context value, which includes the storeTokenInLS function for storing tokens in local storage
*/