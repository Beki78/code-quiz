import gamebg from "../assets/gamebg.jpg";
import Footer from "../components/Footer";
import HashLoader from "react-spinners/HashLoader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Game = (  ) => {
  const [loading, setLoading] = useState(false);
  const [questionNO, setQuestionNO] = useState(0);
  const [data, setData] = useState([]);
  const [choices, setChoices] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
      )
      .then((res) => {
        const questions = res.data.results;
        const formattedChoices = questions.map((question) => {
          const allChoices = [
            ...question.incorrect_answers,
            question.correct_answer,
          ];
          // Shuffle the array of choices
          const shuffledChoices = shuffleArray(allChoices).map((choice) => ({
            text: choice,
            isCorrect: choice === question.correct_answer,
            isSelected: false,
          }));
          return {
            question: question.question,
            choices: shuffledChoices,
          };
        });
        setData(formattedChoices);
        setChoices(formattedChoices[0].choices);
      })
      .catch((err) => console.error(err));
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleButtonClick = (index) => {
    if (clickedIndex === -1) {
      const updatedChoices = [...choices];
      updatedChoices[index].isSelected = true;
      setChoices(updatedChoices);
      setClickedIndex(index);
      if (choices[index].isCorrect) {
        setCorrectCount(correctCount + 1);
      }
    }
  };

  const nextQuestion = () => {
    setQuestionNO(questionNO + 1);
    setChoices(data[questionNO + 1].choices);
    setClickedIndex(-1);
  };

  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center bg-slate-700">
          <HashLoader
            className=""
            color={"#137973"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <div className="relative h-screen select-none">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${gamebg})` }}
            ></div>
            <div className="absolute min-w-xl max-w-3xl flex flex-col right-36 top-20">
              <div className="bg-slate-900 bg-opacity-5 text-green-400 pt-5 pb-5 pl-8 pr-8 rounded-lg backdrop-blur-sm shadow-sm shadow-white">
                <div
                  className="question-container overflow-y-auto"
                  style={{ width: "600px", maxHeight: "300px" }}
                >
                  <h1 className="text-lg font-bold mb-3 ">
                    {data.length > 0 &&
                      `${questionNO + 1}. ${data[questionNO].question}`}
                  </h1>
                </div>
                <hr />
                <div className="flex flex-col gap-3 mt-4 ">
                  {choices.map((choice, index) => (
                    <button
                      key={index}
                      className={`text-base text-start font-bold text-white rounded-lg p-2 bg-slate-800 hover:bg-slate-700 group ${
                        clickedIndex === index
                          ? choice.isCorrect
                            ? "border-2 border-green-500"
                            : "border-2 border-red-500"
                          : ""
                      }`}
                      onClick={() => handleButtonClick(index)}
                    >
                      {choice.text}
                    </button>
                  ))}
                  <div className="flex justify-between">
                    <h1 className="font-bold">
                      {`${correctCount}/${questionNO + 1}`}
                    </h1>
                    {questionNO < 9 ? (
                      <button
                        onClick={nextQuestion}
                        className="text-base text-start font-bold text-white rounded-lg p-2 pl-4 pr-4 bg-green-500 hover:bg-green-700 group"
                        disabled={clickedIndex === -1}
                      >
                        Next
                      </button>
                    ) : (
                      <Link to="/option">
                        <button className="text-base text-start font-bold text-white rounded-lg p-2 pl-4 pr-4 bg-green-500 hover:bg-green-700 group">
                          Finish
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Game;
