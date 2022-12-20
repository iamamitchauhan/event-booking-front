import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function App() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="App">
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-xl sm:w-full w-[90%] mx-auto rounded px-5 pt-6 pb-8 shadow-shadow1">
                <h1 className="text-2xl text-center">Booking Event</h1>
                <div className="flex md:flex-row flex-col justify-center items-center mt-6">
                    <NavLink to="/book-event">
                        <button className="text-sm bg-[#1F75FE] text-[#fff] md:mr-2 rounded px-3 py-2 hover:bg-[#0161FA] transition-all duration-200 shadow-lg mb-2 md:mb-0 md:w-auto w-32">Book Event</button>
                    </NavLink>

                    <NavLink to="/events">
                        <button className="text-sm bg-[#1F75FE] text-[#fff] rounded px-3 py-2 hover:bg-[#0161FA] transition-all duration-200 shadow-lg md:w-auto w-32">Show Events</button>
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
