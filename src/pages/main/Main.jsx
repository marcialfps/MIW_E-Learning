import React from "react";
import styled from "styled-components";
import { DxcButton, DxcHeading } from "@dxc-technology/halstack-react";
import { useHistory } from "react-router-dom";

const Main = () => {
  const history = useHistory();

  return (
    <MainContainer>
      <DxcHeading level={2} text="¡Bienvenido!" />
      <TextContainer>
        <p>
          Si es tu primera vez aquí debes registrarte. No te preocupes, te
          prometo que tardarás menos de 30 segundos.
        </p>
        <p>
          Todo lo que debes saber sobre esta investigación se te explicará
          durante el registro.
        </p>
      </TextContainer>
      <DxcButton
        mode="primary"
        label="Registrarme"
        margin="small"
        onClick={() => history.push("/register")}
      />
      <DxcButton
        mode="secondary"
        label="Ya estoy registrado"
        margin="small"
        onClick={() => history.push("/login")}
      />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
  }
`;

const TextContainer = styled.div`
  margin: 15px;
`;

export default Main;
