import { useState } from "react";

function Booking() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed for ${name} on ${date}`);
  };

  return (
    <div>
      <h1>Book Your Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          required
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Booking;