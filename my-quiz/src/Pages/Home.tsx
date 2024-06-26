import { Link } from "react-router-dom";
import homebgg from "../assets/homebgg.jpg";
import Footer from "../components/Footer";
import HashLoader from "react-spinners/HashLoader";
import { useEffect, useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

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
          <div className="relative h-screen flex md:pl-36 items-center justify-center md:justify-normal">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-95"
              style={{ backgroundImage: `url(${homebgg})` }}
            ></div>
            <div className="bg-slate-900 bg-opacity-5 text-white p-8 md:p-14 rounded-lg backdrop-blur-sm shadow-sm shadow-white">
              <h1 className="text-3xl md:text-5xl sm:text-4xl font-bold mb-12">
                CODE QUIZ
              </h1>
              <Link
                to="/game"
                className="text-xl md:text-2xl sm:text-xl font-bold bg-green-500 text-white px-4 py-2 rounded-md flex justify-center items-center hover:bg-green-600 transition-colors duration-300"
              >
                START
              </Link>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
