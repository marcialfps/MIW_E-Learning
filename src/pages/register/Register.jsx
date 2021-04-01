import React, { useState } from "react";
import styled from "styled-components";
import {
  DxcButton,
  DxcHeading,
  DxcLink,
  DxcInput,
  DxcRadio,
  DxcCheckbox,
  DxcSpinner,
  DxcAlert,
} from "@dxc-technology/halstack-react";
import { login, register } from "../../api-utils/api-utils";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [currentContent, setCurrentContent] = useState(0);
  const [isInvalidBirth, setIsInvalidBirth] = useState(false);
  const [checkedLanguage, changeCheckedLanguage] = useState(false);
  const [checkedConsent, changeCheckedConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, changeUsername] = useState("");
  const [birth, changeBirth] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSelect = (selectFunction) => {
    changeCheckedLanguage(selectFunction);
  };

  const onChangeUsername = (newValue) => {
    changeUsername(newValue);
  };

  const onChangeBirth = (newValue) => {
    changeBirth(newValue);
  };

  const onClickContinue = async () => {
    if (currentContent === 0) {
      setCurrentContent(1);
    } else if (checkedConsent) {
      setIsLoading(true);
      try {
        const getUserResp = await login(username);
        if (getUserResp.data === "empty") {
          const registerResp = await register(username, birth, checkedLanguage);
          console.log("registerResp", registerResp);
          history.push(
            `/start?username=${username}&day=${registerResp.data.day}`
          );
        } else {
          setErrorMessage("Nombre de usuario ya existente");
          setIsError(true);
        }
      } catch (err) {
        console.log(err);
        setErrorMessage("Se ha producido un error desconocido");
        setIsError(true);
      }
      setIsLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <DxcHeading level={3} text="Registro" />
      {isLoading && <DxcSpinner mode="overlay" label="Cargando..." />}
      {currentContent === 0 ? (
        <TextContainer>
          <p>
            La investigación en la que vas a participar tiene como objetivo
            conocer la eficiencia y eficacia de las personas en el aprendizaje
            del vocabulario de un idioma. De la misma manera, también se
            pretende conocer si existen diferencias significativas del
            aprendizaje en personas de diferentes rangos de edad.
          </p>
          <p>
            Esta investigación se engloba dentro de la asignatura Arquitectura y
            Desarrollo de Sistemas de E-learning, del Máster de Ingeniería Web
            de la Universidad de Oviedo.
          </p>
          <p>
            <b>
              Tu objetivo aquí es usar esta herramienta para aprender cierto
              vocabulario de un idioma.
            </b>
          </p>
          <p>
            Durante 3 días tendrás que volver para completar el cuestionario, de
            esta manera sabré si has mejorado o no.
          </p>
          <p>
            Si tienes alguna duda puedes contactar conmigo haciendo{" "}
            <DxcLink
              href="mailto:uo251851@uniovi.es"
              text="click aquí"
            ></DxcLink>
            .{" "}
          </p>
        </TextContainer>
      ) : (
        <TextContainer>
          <p>
            Para registrarte tienes que introducir los datos que se piden abajo.
            No te olvides de tu nombre de usuario ya que será necesario para los
            próximos días.
          </p>
          <DxcInput
            label="Nombre de usuario"
            margin={{ left: "xxsmall", right: "xxsmall" }}
            size="fillParent"
            value={username}
            onChange={onChangeUsername}
          />
          <DxcInput
            label="Edad"
            value={birth}
            onChange={(newValue) => {
              setIsInvalidBirth(
                isNaN(newValue) || +newValue >= 100 || +newValue === 0
              );
              onChangeBirth(newValue);
            }}
            margin={{ left: "xxsmall", right: "xxsmall" }}
            size="fillParent"
            invalid={isInvalidBirth}
          />
          <p>¿Tienes conocimientos previos del idioma alemán?</p>
          <RadioGroup>
            <DxcRadio
              checked={checkedLanguage}
              label="Sí"
              onClick={() => {
                onSelect(true);
              }}
            />
            <DxcRadio
              checked={!checkedLanguage}
              label="No"
              onClick={() => {
                onSelect(false);
              }}
            />
          </RadioGroup>
          <DxcCheckbox
            checked={checkedConsent}
            labelPosition="after"
            label="Doy mi consentimiento para que mis datos personales sean utilizados para un estudio académico."
            onChange={(newValue) => changeCheckedConsent(newValue)}
            margin={{ left: "xxsmall", right: "xxsmall", top: "small" }}
            required
          />
        </TextContainer>
      )}
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
        label="Continuar"
        margin="small"
        onClick={onClickContinue}
      />
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    text-align: center;
  }
`;

const TextContainer = styled.div`
  margin: 15px;

  p {
    margin: 8px 0;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export default Register;
