import optionbackground from "../assets/optionbackground.jpg";
import Footer from "../components/Footer";
import { VscDebugRestart } from "react-icons/vsc";
import { IoHomeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Option = () => {
  return (
    <div className="relative h-screen flex justify-center items-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-95"
        style={{ backgroundImage: `url(${optionbackground})` }}
      ></div>
      <div className="absolute bg-slate-900 bg-opacity-60 text-green-500 p-8 rounded-lg backdrop-blur-sm shadow-sm text-center shadow-white">
        <div className="flex justify-between text-5xl mt-4 gap-10">
          <Link to="/game">
            <VscDebugRestart />
          </Link>
          <Link to="/">
            <IoHomeSharp />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Option;
