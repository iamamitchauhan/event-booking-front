import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function App() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="App">
      <h1>Booking Event</h1>

      <NavLink to="/book-event">
        <button className="">Book Event</button>
      </NavLink>

      <NavLink to="/events">
        <button className="">Show Events</button>
      </NavLink>
    </div>
  );
}

export default App;
