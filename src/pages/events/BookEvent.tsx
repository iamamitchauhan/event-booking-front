import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Header from "../../components/Header";
import { createEvent, getFreeAvailableSlot } from "../../service/event";

interface Slot {
  value: any;
  label: string;
}

const options = [
  { value: "Asia/Kolkata", label: "Asia/Kolkata (GMT+5:30)" },
  { value: "Canada/Newfoundland", label: "Canada/Newfoundland (GMT-3:30)" },
  { value: "America/Caraca", label: "America/Caracas (GMT-4)" },
  { value: "Pacific/Midwa", label: "Pacific/Midway (GMT-11)" },
  { value: "Asia/Dubai", label: "Asia/Dubai (GMT+4)" },
];

const BookEvent = () => {
  const [date, setDate] = useState<string | any>(new Date());
  const [duration, setDuration] = useState("");
  const [timezone, setTimezone] = useState(options[0]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFetchingFreeSlots, setIsLoadingFetchingFreeSlots] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState({
    startHours: "",
    endHours: "",
    duration: 0,
    timezone: "",
  });
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  useEffect(() => {
    document.title = "Book Event";
  }, []);

  const findFreeSlot = async () => {
    try {
      setIsLoadingFetchingFreeSlots(true);

      const { data, status }: any = await getFreeAvailableSlot({ date: moment(date).format("YYYY-MM-DD"), timeZone: timezone.value });

      //moment("2022-12-19T12:00:00-09:00","YYYY-hh-DDTHH:mm:ss").format("hh:mm")
      if (status === 200) {
        const availableSlots = data.slots.map((date: string) => {
          return {
            label: moment(date, "YYYY-hh-DDTHH:mm:ss").format("hh:mm A"),
            value: +moment(date).utc().format("x"),
          };
        });
        setSlots(availableSlots);
        setDoctorProfile(data.doctorProfile);
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
    } finally {
      setIsLoadingFetchingFreeSlots(false);
    }
  };

  const handleChange = (e: any) => {
    setDate(e);
  };

  const handleDurationChange = (e: any) => {
    setDuration(e.target.value);
  };

  const getFreeSlot = () => {
    findFreeSlot();
  };

  const onChangeTimezone = (val: any) => {
    setTimezone(val);
  };

  const createEventHandler = async () => {
    if (!selectedSlot) {
      return;
    }
    try {
      setIsLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, status }: any = await createEvent({ datetime: moment(selectedSlot.value).toISOString(), duration: +duration });

      if (status === 200) {
        alert("Event Created!");
        // fetch new free slots
        findFreeSlot();
      } else {
        //   show success or failed message here
        alert("Time slot is not available");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="App">
        <div className="max-w-3xl mx-auto mt-10 px-6 lg:px-0">
          <Header title="Book Event" backUrl="/" />
          <div className="flex md:flex-row flex-col">
            <div className="md:w-1/2 md:border-r md:border-[#e6e6e69c] md:pr-8 md:mb-0 mb-5">
              <div className="mb-4">
                <p className="text-sm md:pb-2.5 pb-4 md:text-left text-center">Pick a Date and Time</p>
                <div className="custom-datepicker md:text-left text-center">
                  <DatePicker selected={date} onChange={handleChange} inline />
                </div>
              </div>
              <div className="mb-6 ">
                <input
                  className="w-full text-sm border-b border-[#e6e6e69c] placeholder:text-sm placeholder:font-normal"
                  type={"text"}
                  value={duration}
                  placeholder="Enter Duration"
                  onChange={handleDurationChange}
                />
              </div>
              <div className="mb-3 ">
                <Select options={options} value={timezone} onChange={onChangeTimezone} />
              </div>
              <div className="md:text-left text-center">
                <button className="text-sm bg-[#1F75FE] text-[#fff] rounded px-3 py-2 hover:bg-[#0161FA] transition-all duration-200 shadow-lg" onClick={getFreeSlot}>
                  Get Free Slots
                </button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="max-h-[430px] overflow-y-auto flex flex-wrap mb-8">
                {!isLoadingFetchingFreeSlots && slots.length > 0 ? (
                  <>
                    <p className="text-sm pb-2">{`Available Starting times for ${moment().format("ddd, MMMM DD,YYYY")} ( ${doctorProfile.startHours} - ${doctorProfile.endHours} ) ${
                      doctorProfile.timezone
                    } `}</p>
                    {slots.map((slot, index) => (
                      <div
                        className="rounded block cursor-pointer transition-all duration-300 px-2 py-1.5 font-medium mt-1.5 border border-[#e6edf2] w-[calc(50%_-_6px)] text-sm mr-1.5 text-center"
                        onClick={() => setSelectedSlot(slot)}
                        style={{
                          background: selectedSlot?.label === slot.label ? "#1F75FE" : "transparent",
                          color: selectedSlot?.label === slot.label ? "#fff" : "#000",
                        }}
                        key={index}
                        id={slot.value}
                      >
                        {slot.label}
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-sm w-full pt-[100px] text-center">{isLoadingFetchingFreeSlots ? "Fetching..." : `No Slots available`}</p>
                )}
              </div>
              {!isLoadingFetchingFreeSlots && slots.length > 0 && (
                <div className="text-center md:mb-0 mb-6">
                  <button
                    className={`text-sm ${
                      selectedSlot ? "bg-[#1F75FE] hover:bg-[#0161FA]" : "bg-[#c5c5c5] pointer-events-none"
                    } text-[#fff] rounded px-8 py-2 transition-all duration-200 shadow-lg cursor-pointer`}
                    disabled={!selectedSlot}
                    onClick={createEventHandler}
                  >
                    {isLoading ? "Booking..." : "Book Slot"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEvent;
