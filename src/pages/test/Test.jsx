import React, { useState } from "react";
import styled from "styled-components";
import { DxcButton, DxcHeading, DxcChip } from "@dxc-technology/halstack-react";
import { useStopwatch } from "react-timer-hook";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import test1 from "./test1.json";
import test2 from "./test2.json";
import test3 from "./test3.json";
import test4 from "./test4.json";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Test = () => {
  const history = useHistory();
  const query = useQuery();
  const [test, setTest] = useState(
    parseInt(query.get("day")) === 1
      ? test1
      : parseInt(query.get("day")) === 2
      ? test2
      : parseInt(query.get("day")) === 3
      ? test3
      : test4
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [incorrectOption, setIncorrectOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [nextButtonActive, setNextButtonActive] = useState(false);

  // Study data
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const { seconds, minutes, start, pause } = useStopwatch({ autoStart: true });
  const [points, setPoints] = useState(0);

  const clickOption = (optionIndex) => {
    setSelectedOption(optionIndex);
    setNumberOfClicks(numberOfClicks + 1);
  };

  const clickVerify = () => {
    if (
      test.questions[currentQuestion].answer ===
      test.questions[currentQuestion].options[selectedOption].option
    ) {
      setCorrectOption(selectedOption);
      setPoints(points + 1);
    } else {
      setIncorrectOption(selectedOption);
      setCorrectOption(
        test.questions[currentQuestion].options.findIndex(
          (op) => op.option === test.questions[currentQuestion].answer
        )
      );
    }
    pause();
    setNextButtonActive(true);
  };

  const clickNext = () => {
    if (currentQuestion === 9) {
      history.push(
        `/results?username=${query.get("username")}&day=${query.get(
          "day"
        )}&time=${minutes}:${
          seconds < 10 ? `0${seconds}` : `${seconds}`
        }&clicks=${numberOfClicks}&points=${points}`
      );
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setNextButtonActive(false);
      setIncorrectOption(null);
      setCorrectOption(null);
      setSelectedOption(null);

      start();
    }
  };

  return (
    <TestContainer>
      <Information>
        <p>{`Pregunta: ${currentQuestion + 1}/10`}</p>
        <DxcChip
          label={`${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`}
        />
      </Information>

      <DxcHeading level={3} text={test.questions[currentQuestion].question} />

      <OptionsContainer>
        {test.questions[currentQuestion].options.map((option, i) => (
          <OptionButton
            onClick={() => clickOption(i)}
            isSelected={selectedOption === i}
            isCorrect={correctOption === i}
            isIncorrect={incorrectOption === i}
            key={option.option}
          >
            {option.image && <ImageContainer src={option.image} />}
            <TextContainer>{option.option}</TextContainer>
          </OptionButton>
        ))}
      </OptionsContainer>

      {nextButtonActive ? (
        <DxcButton
          mode="primary"
          label="Siguiente"
          margin="small"
          onClick={clickNext}
        />
      ) : (
        <DxcButton
          mode="primary"
          label="Corregir"
          margin="small"
          onClick={clickVerify}
          disabled={selectedOption === null}
        />
      )}
    </TestContainer>
  );
};

const TestContainer = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    text-align: center;
  }
`;

const OptionsContainer = styled.div`
  margin: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const TextContainer = styled.div`
  display: flex;
  align-self: center;
`;

const ImageContainer = styled.img`
  width: 80px;
  height: 80px;
  align-self: center;
`;

const OptionButton = styled.button`
  background-color: ${(props) =>
    props.isCorrect
      ? `#66F58ACC`
      : props.isIncorrect
      ? `#F9270BCC`
      : props.isSelected
      ? `#0BB7F9CC`
      : `white`};
  ${(props) =>
    props.isCorrect
      ? `border-color: #66F58A;`
      : props.isIncorrect
      ? `border-color: #F9270B;`
      : props.isSelected
      ? `border-color: #0BB7F9;`
      : `border-color: #808080;`}
  margin-bottom: 10px;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  border-radius: 4px;
`;

const Information = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 5px;
`;

const OptionsRow = styled.div``;

export default Test;
