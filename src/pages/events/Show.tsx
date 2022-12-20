import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import Header from "../../components/Header";
import { getEvents } from "../../service/event";

const Show = () => {
  const [events, setEvents] = useState([
    {
      id: "ap8nxHrEWXgdLoFZLJxf",
      start: "2022-12-20T05:00:00.000Z",
      end: "2022-12-20T05:14:00.000Z",
    },
    {
      id: "5cA15bO5H5WQbXx6QoYP",
      start: "2022-12-20T05:15:00.000Z",
      end: "2022-12-20T05:30:00.000Z",
    },
    {
      id: "1ocVQm1bURcShqjNygOL",
      start: "2022-12-20T05:30:01.000Z",
      end: "2022-12-20T05:45:01.000Z",
    },
    {
      id: "XqJrEiJHxFnMQG9IQA2q",
      start: "2022-12-21T05:30:00.000Z",
      end: "2022-12-21T06:00:00.000Z",
    },
  ]);
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
        startDate: moment(startDate).utc().startOf("day").toISOString(),
        endDate: moment(endDate).utc().endOf("day").toISOString(),
      });

      if (status === 200) {
        setEvents(data.data);
      } else {
        setEvents([]);
        return [];
      }
    } catch (error) {
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
      <div className="max-w-3xl mx-auto mt-10 px-4 lg:px-0">
        <Header title="All Events" backUrl="/" />
        <div className="flex md:flex-row flex-col">
          <div className="md:w-2/5 md:border-r md:border-[#e6e6e69c] md:pr-8 md:mb-0 mb-7">
            <div className="custom-datepicker  md:text-left text-center">
              <DatePicker selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} selectsRange inline />
            </div>
          </div>

          <div className="md:w-3/5 md:pl-8">
            <div className="md:max-h-[430px] overflow-y-auto xxs:w-[340px] w-[320px] md:w-auto md:mx-0 mx-auto mb-6 md:mb-0">
              {isLoading ? (
                <div className="loading text-sm text-center">Fetching...</div>
              ) : (
                events.map(({ id, start, end }: { id: string; start: string; end: string }, index) => {
                  return (
                    <div className="mb-5">
                      <p></p>
                      <p className="text-sm leading-none pb-3 w-1/2">{id}</p>
                      <div className="flex sm:flex-row flex-col md:justify-start justify-center">
                        <span className="text-sm sm:w-[calc(50%_-_8px)] w-full mr-[8px] border border-[#dedede] px-2 py-1.5 rounded bg-[#f7f7f7] md:mb-0 mb-2">
                          {moment(start).local().format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                        <span className="text-sm sm:w-[calc(50%_-_8px)] w-full border border-[#dedede] px-2 py-1.5 rounded bg-[#f7f7f7]">{moment(end).local().format("YYYY-MM-DD HH:mm:ss")}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
