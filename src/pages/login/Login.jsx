import React, { useState } from "react";
import styled from "styled-components";
import {
  DxcButton,
  DxcHeading,
  DxcInput,
  DxcAlert,
  DxcSpinner
} from "@dxc-technology/halstack-react";
import { useHistory } from "react-router-dom";
import { login } from "../../api-utils/api-utils";

const Login = () => {
  const history = useHistory();
  const [value, changeValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onChange = (newValue) => {
    changeValue(newValue);
  };
  const clickLogin = async () => {
    setIsLoading(true);
    try {
      const loginResp = await login(value);
      if (loginResp.data === "empty") {
        setErrorMessage("El usuario introducido no existe");
        setIsError(true);
      } else {
        history.push(`/start?username=${value}&day=${loginResp.data.day}`);
      }
      console.log(loginResp);
    } catch (err) {
      console.log(err);
      setErrorMessage("Se ha producido un error desconocido");
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <LoginContainer>
      {isLoading && (
        <DxcSpinner mode="overlay" label="Cargando..." />) }
      <DxcHeading level={3} text="Acceso" />
      <TextContainer>
        <p>Por favor, introduce el nombre de tu usuario.</p>
        <DxcInput
          label="Nombre de usuario"
          margin={{ left: "xxsmall", right: "xxsmall" }}
          size="fillParent"
          value={value}
          onChange={onChange}
        />
      </TextContainer>
      {isError &&
      (
        <DxcAlert
          type="error"
          mode="inline"
          inlineText={errorMessage}
          margin="small"
          size="fillParent"
        />
      )}
      <DxcButton
        mode="primary"
        label="Acceder"
        margin="small"
        onClick={clickLogin}
      />
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    text-align: center;
  }
`;

const TextContainer = styled.div`
  margin: 15px;
`;

export default Login;
