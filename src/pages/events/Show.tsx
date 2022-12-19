import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import Header from "../../components/Header";
import { getEvents } from "../../service/event";

const Show = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(moment().add("d", 1).format()));

  const onChange = (dates: any[]) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  const getEventsList = async (startDate: any, endDate: any) => {
    try {
      setIsLoading(true);
      const { status, data }: any = await getEvents({
        startDate: moment(startDate).utc().startOf("day").format(),
        endDate: moment(endDate).utc().endOf("day").format(),
      });

      if (status === 200) {
        setEvents(data.data);
      } else {
        setEvents([]);
        return [];
      }
    } catch (error) {
      console.info("something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      getEventsList(startDate, endDate);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    document.title = "Display All events";
  }, []);

  return (
    <div>
      <Header title="All Events" backUrl="/" />
      <div>
        <DatePicker selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} selectsRange inline />
      </div>
      <div>
        <div>
          {isLoading
            ? "Fetching..."
            : events.map(({ id, start, end }: { id: string; start: string; end: string }, index) => {
                return (
                  <div>
                    <p>{id}</p>
                    <span>{moment(start).local().format("YYYY-MM-DD HH:mm:ss")}</span>
                    <br />
                    <span>{moment(end).local().format("YYYY-MM-DD HH:mm:ss")}</span>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Show;
