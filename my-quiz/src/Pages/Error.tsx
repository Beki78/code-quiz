import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import optionbackground from "../assets/optionbackground.jpg";


const Error = () => {
  return (
    <div className="relative h-screen flex justify-center items-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-95"
        style={{ backgroundImage: `url(${optionbackground})` }}
      ></div>
      <div className="absolute bg-slate-900 bg-opacity-60 text-green-500 p-12 rounded-lg backdrop-blur-sm shadow-sm text-center shadow-white">
        <h1 className="text-4xl font-bold mb-12 ">Page Not Found</h1>
        <Link to="/">
          <h1 className="text-xl font-bold bg-green-500 text-white px-4 py-2 rounded-md flex justify-center items-center hover:bg-green-600 transition-colors duration-300">
            Back To Home Page
          </h1>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default Error
