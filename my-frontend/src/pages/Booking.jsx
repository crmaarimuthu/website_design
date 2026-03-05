import { useState } from "react";

function Booking(){

const [form,setForm]=useState({
name:"",
email:"",
date:"",
event:"Wedding"
});

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit=(e)=>{
e.preventDefault();

console.log("Booking Data:",form);

alert("Booking submitted successfully!");

setForm({
name:"",
email:"",
date:"",
event:"Wedding"
});
};

return(

<div className="booking-page">

<h1>Book Your Event</h1>

<form onSubmit={handleSubmit} className="booking-form">

<input
type="text"
name="name"
placeholder="Your Name"
value={form.name}
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
required
/>

<select
name="event"
value={form.event}
onChange={handleChange}
>
<option>Wedding</option>
<option>Pre Wedding</option>
<option>Birthday</option>
<option>Fashion Shoot</option>
</select>

<input
type="date"
name="date"
value={form.date}
onChange={handleChange}
required
/>

<button type="submit">Confirm Booking</button>

</form>

</div>

);
}

export default Booking;