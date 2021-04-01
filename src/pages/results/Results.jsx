import React, { useState } from "react";
import styled from "styled-components";
import {
  DxcButton,
  DxcHeading,
  DxcAlert,
  DxcSpinner,
} from "@dxc-technology/halstack-react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { save } from "../../api-utils/api-utils";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Results = () => {
  const query = useQuery();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const sendResults = async () => {
    setIsLoading(true);
    try {
      await save(
        query.get("username"),
        query.get("day"),
        query.get("points"),
        query.get("time"),
        query.get("clicks")
      );
    } catch (err) {
      console.log(err);
      setErrorMessage("Se ha producido un error desconocido");
      setIsError(true);
    }
    setIsLoading(false);
    history.push("/finish");
  };
  return (
    <ResultsContainer>
      <DxcHeading level={3} text="Tus resultados" />
      {isLoading && <DxcSpinner mode="overlay" label="Cargando..." />}
      <TextContainer>
        <p>{`Tiempo total: ${query.get("time")}`}</p>
        <p>{`Número de clicks: ${query.get("clicks")}`}</p>
        <p>{`Puntos: ${query.get("points")}`}</p>
      </TextContainer>
      {isError && (
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
        label="Enviar y terminar"
        margin="small"
        onClick={sendResults}
      />
    </ResultsContainer>
  );
};

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    text-align: center;
  }
`;

const TextContainer = styled.div`
  margin: 15px;
`;

export default Results;
