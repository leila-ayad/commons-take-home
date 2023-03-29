import React from "react";
import { Authentication } from "../../../features/auth/Authentication";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {LoginReducer} from "../../../features/auth/auth.redux";
import { login } from "../../../features/auth/auth.redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { RootReducer } from "../../../store/RootReducer";

const store = createStore(RootReducer, applyMiddleware(thunkMiddleware));

describe("Authentication Component", () => {
  it("renders the component without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Authentication />
        </BrowserRouter>
      </Provider>
    );

    const signInText = screen.getByText("Sign In");
    expect(signInText).toBeInTheDocument();
  });

  it("should allow users to enter email and password", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Authentication />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password");
  });

  it("should display an error message when user inputs wrong email", () => {
    const mockFailureAction = jest.fn(
      (email, password, onSuccess, onFailure) => {
        return onFailure({ error: "Email Not Found" });
      }
    );
    jest.mock("../../../features/auth/auth.redux", () => ({
      login: (email, password, onSuccess, onFailure) => {
        console.log("Mock login function called");
        return mockFailureAction(email, password, onSuccess, onFailure);
      },
    }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Authentication />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("LOGIN");

    fireEvent.change(emailInput, {
      target: { value: "testuse@thecommons.earth" },
    });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.click(loginButton);

    const errorMessage = screen.getByText("Email Not Found");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should navigate to challenges page when login succeeds", () => {
    const mockSuccessAction = jest.fn(() =>
      Promise.resolve({ mockToken: "test-token" })
    );
    //why isn't it using the login function?
    jest.mock("../../../features/auth/auth.redux", () => ({
      login: (email, password, onSuccess, onFailure) =>
        mockSuccessAction(email, password, onSuccess, onFailure),
    }));

    const history = { push: jest.fn() };
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Authentication history={history} />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("LOGIN");

    fireEvent.change(emailInput, {
      target: { value: "testuser@thecommons.earth" },
    });
    fireEvent.change(passwordInput, { target: { value: "mockUserPassword" } });

    fireEvent.click(loginButton);

    expect(history.push).toHaveBeenCalledWith("/challenges");
    expect(localStorage.getItem("@token")).toBe("test-token");
  });
});
