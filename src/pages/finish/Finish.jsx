import React from "react";
import styled from "styled-components";
import { DxcHeading } from "@dxc-technology/halstack-react";

const Finish = () => {
  return (
    <FinishContainer>
      <DxcHeading level={2} text="¡Gracias!" />
      <TextContainer>
        <p>
          La información se ha guardado correctamente. Ya puedes cerrar el sitio
          web.
        </p>
      </TextContainer>
    </FinishContainer>
  );
};

const FinishContainer = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
  }
`;

const TextContainer = styled.div`
  margin: 15px;
`;

export default Finish;
