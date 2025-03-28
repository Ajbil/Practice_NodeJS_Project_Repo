import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const { LogoutUser } = useAuth(); //this logoutuser function i creted in store and i am using it here 

  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);

  return <Navigate to="/login" />;
};

/*
Explanation:
useEffect is a React hook that is used for side effects in functional components. In this case, it is used to call the LogoutUser function when the component is mounted.
useAuth is a custom hook that provides access to the authentication context. It returns an object that includes the LogoutUser function.
The LogoutUser function is called inside the useEffect hook, which presumably logs the user out by clearing the token and removing it from local storage.
The Navigate component is used to redirect the user to the "/login" route after the logout.
*/