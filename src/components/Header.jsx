import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const token = Cookies.get("token");
  let decoded;

  if (token) {
    decoded = jwtDecode(token);
  }
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight text-emerald-600">
          fastbuy
        </h1>
        <Link to={token ? "/" : "/login"}>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2 rounded-full transition-colors text-sm shadow-sm cursor-pointer">
            {token ? decoded?.fullName : "login"}
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
