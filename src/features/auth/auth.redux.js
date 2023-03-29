import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { callApi, apiTypeBuilder } from "../../utility/api";

const LOGIN = apiTypeBuilder("LOGIN");

export const login = (email, password, onSuccess, onFailure) =>
  callApi({
    type: LOGIN,
    method: "POST",
    body: { email, password },
    endpoint: "/interviews/login",
    onSuccess,
    onFailure,
  });

export const initialState = {
  loggedIn: !!localStorage.getItem("@token") || false,
  user: {},
};

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.success:
      return {
        ...state,
        user: action.payload.mockUser,
        loggedIn: true,
      };
    default:
      return state;
  }
};

export const useUserData = () => {
  const currentUser = useSelector((s) => s.auth.user);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  console.log(currentUser)
  useEffect(() => {
    setUser(currentUser);
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return user;
}; 

