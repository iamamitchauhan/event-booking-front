import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Header from "../../components/Header";
import {
  createEvent,
  // getFreeAvailableSlot
} from "../../service/event";

interface Slot {
  value: any;
  label: string;
}
const options = [
  { value: "Canada/Newfoundland (GMT-3:30)", label: "Canada/Newfoundland (GMT-3:30)" },
  { value: "America/Caracas (GMT-4)", label: "America/Caracas (GMT-4)" },
  { value: "Pacific/Midway (GMT-11)", label: "Pacific/Midway (GMT-11)" },
  { value: "Asia/Kolkata (GMT+5:30)", label: "Asia/Kolkata (GMT+5:30)" },
  { value: "Asia/Dubai (GMT+4)", label: "Asia/Dubai (GMT+4)" },
];

const BookEvent = () => {
  const [date, setDate] = useState<string | any>(new Date());
  const [duration, setDuration] = useState("");
  const [timezone, setTimezone] = useState(options[0]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  useEffect(() => {
    document.title = "Book Event";
  }, []);

  const findFreeSlot = async () => {
    // const { data, status }: any = await getFreeAvailableSlot({ date: moment(date).startOf("day"), timeZone: "Asia/Kolkata (GMT+5:30)" });
    //moment("2022-12-19T12:00:00-09:00","YYYY-hh-DDTHH:mm:ss").format("hh:mm")
    const tempData = [
      "2022-12-20T02:30:00+05:30",
      "2022-12-20T03:00:00+05:30",
      "2022-12-20T18:30:00+05:30",
      "2022-12-20T19:00:00+05:30",
      "2022-12-20T19:30:00+05:30",
      "2022-12-20T20:00:00+05:30",
      "2022-12-20T20:30:00+05:30",
      "2022-12-20T21:00:00+05:30",
      "2022-12-20T21:30:00+05:30",
      "2022-12-20T22:00:00+05:30",
      "2022-12-20T22:30:00+05:30",
      "2022-12-20T23:00:00+05:30",
      "2022-12-20T23:30:00+05:30",
    ];

    const availableSlots = tempData.map((date) => {
      return {
        label: moment(date, "YYYY-hh-DDTHH:mm:ss").format("hh:mm A"),
        value: +moment(date).utc().format("x"),
      };
    });
    setSlots(availableSlots);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, status }: any = await createEvent({ datetime: moment(selectedSlot.value).utc().format(), duration: +duration });
    //   show success or failed message here
  };

  return (
    <div>
      <div className="App">
        <Header title="Book Event" backUrl="/" />
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div style={{ width: "30%" }}>
            <div>
              <p>Pick a Date and Time</p>
              <DatePicker selected={date} onChange={handleChange} inline />
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
