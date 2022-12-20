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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, status }: any = await createEvent({ datetime: moment(selectedSlot.value).toISOString(), duration: +duration });

      if (status === 200) {
        alert("Event Created!");
      } else {
        //   show success or failed message here
        console.info("data.data =>", data);
        alert("Time slot is not available");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <div className="App">
        <Header title="Book Event" backUrl="/" />
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div style={{ width: "30%" }}>
            <div>
              <p>Pick a Date and Time</p>
              <DatePicker selected={date} minDate={new Date()} onChange={handleChange} inline />
            </div>
            <div>
              <input type={"text"} value={duration} placeholder="Enter Duration" onChange={handleDurationChange} />
            </div>
            <div>
              <Select options={options} value={timezone} onChange={onChangeTimezone} />
            </div>
            <div>
              <button onClick={getFreeSlot}>Get Free Slots Button</button>
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div>
              {slots.length > 0 ? (
                <>
                  <p>{`Available Starting times for ${moment().format("ddd, MMMM DD,YYYY")} ( ${doctorProfile.startHours} - ${doctorProfile.endHours} ) ${doctorProfile.timezone} `}</p>
                  {slots.map((slot, index) => (
                    <div
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        display: "block",
                        cursor: "pointer",
                        transition: "all .3s ease-in-out",
                        padding: "7px 20px",
                        border: "1px solid #e6edf2",
                        borderRadius: "4px",
                        maxWidth: 70,
                        margin: "0 auto",
                        fontWeight: "500",
                        marginTop: 5,
                        userSelect: "none",
                        background: selectedSlot?.label === slot.label ? "#188bf6" : "transparent",
                        color: selectedSlot?.label === slot.label ? "#fff" : "#000",
                      }}
                      key={index}
                      id={slot.value}
                    >
                      {slot.label}
                    </div>
                  ))}
                  <button disabled={!selectedSlot} onClick={createEventHandler}>
                    Book Slot
                  </button>
                </>
              ) : (
                "No Slots available"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEvent;
