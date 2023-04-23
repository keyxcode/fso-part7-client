import { createContext, useReducer } from "react";

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        type: "success",
        message: action.payload,
      };
    case "LOGIN_ERROR":
      return {
        type: "error",
        message: action.payload,
      };
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
