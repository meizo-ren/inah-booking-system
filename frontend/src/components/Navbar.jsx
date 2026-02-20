import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Inah Booking </h2>
      <div>
        <Link to="/booking">Book</Link>
        <Link to="/my-bookings">My Bookings</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;