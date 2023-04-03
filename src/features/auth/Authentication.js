// Reference: https://styled-components.com/
import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./auth.redux";

import { Input } from "../../components/Input";
import LogoAnimated from "../../components/LogoAnimated";

const Container = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 24px;
  font-family: "poppins-bold";
`;

const Button = styled.div`
  text-align: center;
  border: 1px solid black;
  padding: 16px;
  width: 100%;
  background-color: #3a4354;
  color: #ffffff;
  font-family: "poppins-bold";
`;

const ErrorContainer = styled.div`
  margin-top: 10px;
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #b94940;
  opacity: 70%;
`;

const ErrorMessage = styled.h3`
  margin-bottom: 24px;
  color: white;
  font-family: "poppins-bold";
`;

const initialState = { email: "", password: "" };

export const Authentication = () => {
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = (event, name) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const authenticate = () => {
    setHasError(false);
    dispatch(
      login(formData.email, formData.password, onSuccessAction, onFailureAction)
    );
  };

  const onSuccessAction = (response) => {
    history.push("/challenges");
    localStorage.setItem("@token", response.mockToken);
    console.log(response);
    console.log("[LOGIN] succeeded");
  };

  const onFailureAction = (error) => {
    console.log(error.error);
    setHasError(true);
    setErrorMessage(error.error);
    console.log("[LOGIN] failed");
  };

  return (
    <Container>
      <LogoAnimated />
      <Heading data-testid="Heading">Sign In</Heading>

      <form>
        {/* I can't get the type used in the custom input component to work */}
        <Input
          name="email"
          type="text"
          value={formData.email}
          placeholder="Email"
          onChange={(event) => handleInputChange(event, "email")}
        ></Input>
        <Input
          name="password"
          type="password"
          value={formData.password}
          placeholder="Password"
          onChange={(event) => handleInputChange(event, "password")}
        ></Input>
        <Button onClick={authenticate} component={Link}>
          LOGIN
        </Button>
        {hasError && (
          <ErrorContainer>
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </ErrorContainer>
        )}
      </form>
    </Container>
  );
};
