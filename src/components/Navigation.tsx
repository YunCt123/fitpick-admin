import { Link, useLocation } from "react-router-dom";
import logoWeb from "../assets/FitPick-logo.png";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex items-center space-x-2">
              <img src={logoWeb} alt="FitPick Logo" className="h-15 w-auto bg-transparent" />
              <span className="text-2xl font-bold text-purple-600">FitPick</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/home"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/home")
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/about")
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              About
            </Link>
            <Link
              to="/download"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/download")
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Download
            </Link>
            <Link
              to="/login"
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;