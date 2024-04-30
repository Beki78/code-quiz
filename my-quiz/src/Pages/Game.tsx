import gamebg from "../assets/gamebg.jpg";
import Footer from "../components/Footer";
import HashLoader from "react-spinners/HashLoader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Game = () => {
  const [loading, setLoading] = useState(false);
  const [questionNO, setQuestionNO] = useState(0);
  const [data, setData] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(-1);

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
      .then((res) => setData(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  const nextQuestion = () => {
    setQuestionNO(questionNO + 1);
    setClickedIndex(-1); // Reset clicked index when moving to next question
  };

  const handleButtonClick = (index) => {
    setClickedIndex(index);
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
            <div className="absolute min-w-xl flex flex-col right-36 top-20">
              <div className="bg-slate-900 bg-opacity-5 text-green-400 pt-5 pb-5 pl-8 pr-8 rounded-lg backdrop-blur-sm shadow-sm shadow-white">
                <div
                  className="question-container overflow-y-auto"
                  style={{ maxHeight: "300px" }} // Set a fixed height
                >
                  <h1 className="text-lg font-bold mb-3 ">
                    {data.length > 0 &&
                      `${questionNO + 1}. ${data[questionNO].question}`}
                  </h1>
                </div>
                <hr />
                <div className="flex flex-col gap-3 mt-4 ">
                  {data.length > 0 &&
                    data[questionNO]?.incorrect_answers.map((choice, index) => (
                      <button
                        key={index}
                        className={`text-base text-start font-bold text-white rounded-lg p-2 bg-slate-800 hover:bg-slate-700 group ${
                          clickedIndex === index
                            ? "border-2 border-green-500"
                            : ""
                        }`}
                        onClick={() => handleButtonClick(index)}
                      >
                        {choice}
                      </button>
                    ))}
                  <div className="flex justify-between">
                    <h1 className="font-bold"> 3/10</h1>
                    {questionNO < 9 ? (
                      <button
                        onClick={nextQuestion}
                        className="text-base text-start font-bold text-white rounded-lg p-2 pl-4 pr-4 bg-green-500 hover:bg-green-700 group"
                      >
                        Next
                      </button>
                    ) : (
                      <Link to="/option">
                        <button
                          onClick={nextQuestion}
                          className="text-base text-start font-bold text-white rounded-lg p-2 pl-4 pr-4 bg-green-500 hover:bg-green-700 group"
                        >
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
