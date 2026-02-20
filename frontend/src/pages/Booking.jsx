import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./Booking.css";

const services = {
  "Salon & Beauty": [
    { name: "Haircut", price: 300 },
    { name: "Manicure", price: 250 },
    { name: "Pedicure", price: 300 }
  ],
  "Hotel": [
    { name: "Standard Room", price: 1500 },
    { name: "Deluxe Room", price: 2500 },
    { name: "Suite Room", price: 4000 }
  ],
  "Automotive": [
    { name: "Car Wash", price: 500 },
    { name: "Oil Change", price: 1200 }
  ]
};

const timeSlots = [
  "09:00 AM","10:00 AM","11:00 AM",
  "01:00 PM","02:00 PM","03:00 PM","04:00 PM"
];

function Booking() {
  const [category, setCategory] = useState("");
  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/bookings", {
      service: service.name,
      price: service.price,
      date,
      timeSlot
    });

    alert("✅ Booking Created");
  };

  return (
    <>
      <Navbar />
      <div className="booking-wrapper">
        <div className="booking-card">
          <h2>Book a Service</h2>

          <form onSubmit={handleSubmit}>
            <label>Industry</label>
            <select onChange={(e)=>{setCategory(e.target.value); setService(null);}}>
              <option>Select industry</option>
              {Object.keys(services).map(cat=>(
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <label>Service</label>
            <select onChange={(e)=>setService(JSON.parse(e.target.value))}>
              <option>Select service</option>
              {category && services[category].map(s=>(
                <option key={s.name} value={JSON.stringify(s)}>
                  {s.name} - ₱{s.price}
                </option>
              ))}
            </select>

            <label>Date</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />

            <label>Time</label>
            <div className="time-grid">
              {timeSlots.map(time=>(
                <button
                  type="button"
                  key={time}
                  className={timeSlot===time ? "active" : ""}
                  onClick={()=>setTimeSlot(time)}
                >
                  {time}
                </button>
              ))}
            </div>

            {service && (
              <div className="price-box">
                Total Price: ₱{service.price}
              </div>
            )}

            <button className="confirm-btn">Confirm Booking</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Booking;