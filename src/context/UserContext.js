import { createContext, useContext, useState } from "react";


const CreateUserContext = createContext({
    loggedInUser: "Default User",
  });

export const UserContext = ({ children }) => {
    const [userDetails, setUserDetails] = useState([]);
  
    return (
      <CreateUserContext.Provider value={[userDetails, setUserDetails]}>
        {children}
      </CreateUserContext.Provider>
    );
  };


export const useUserData = () => useContext(CreateUserContext);