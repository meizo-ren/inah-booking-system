import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get("/bookings/my");
    setBookings(res.data);
  };

  const deleteBooking = async (id) => {
    await API.delete(`/bookings/${id}`);
    fetchBookings();
  };

  useEffect(()=>{
    fetchBookings();
  },[]);

  return (
    <>
      <Navbar />
      <div className="bookings-wrapper">
        <h2>My Bookings</h2>

        <div className="booking-list">
          {bookings.map(b=>(
            <div className="booking-item" key={b._id}>
              <h3>{b.service}</h3>
              <p>Date: {b.date}</p>
              <p>Time: {b.timeSlot}</p>
              <p>Price: ₱{b.price}</p>
              <button onClick={()=>deleteBooking(b._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyBookings;