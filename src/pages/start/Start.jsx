import React, { useState } from "react";
import styled from "styled-components";
import { DxcButton, DxcHeading } from "@dxc-technology/halstack-react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Start = () => {
  const history = useHistory();
  const query = useQuery();
  const clickStart = async () => {
    history.push(
      `/test?username=${query.get("username")}&day=${query.get("day")}`
    );
  };

  return (
    <StartContainer>
      <DxcHeading level={3} text="¿Preparado para comenzar?" margin="small" />
      <DxcHeading
        level={4}
        text={`Usuario: ${query.get("username")}`}
        margin="xxsmall"
      />
      <DxcHeading
        level={4}
        text={`Sesión: ${query.get("day")}`}
        margin="xxsmall"
      />
      <DxcButton
        mode="primary"
        label="Comenzar"
        margin="small"
        onClick={clickStart}
      />
    </StartContainer>
  );
};

const StartContainer = styled.div`
  display: flex;
  flex-direction: column;

  h3,
  h4 {
    text-align: center;
  }
`;

export default Start;
