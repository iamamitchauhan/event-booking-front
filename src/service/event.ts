import axios from "axios";

interface GetEventProps {
  startDate: any;
  endDate: any;
}
const getEvents = async ({ startDate, endDate }: GetEventProps) => {
  try {
    return await axios.get(process.env.REACT_APP_HOST_URL + "/events?startDate=" + startDate + "&endDate=" + endDate);
  } catch (error) {
    return error;
  }
};

interface GetFreeSlotProps {
  date: any;
  timeZone: string;
}
const getFreeAvailableSlot = async ({ date, timeZone }: GetFreeSlotProps) => {
  try {
    return await axios.get(process.env.REACT_APP_HOST_URL + "/events/free-slots?date=" + date + "&timezone=" + timeZone);
  } catch (error) {
    return error;
  }
};

interface CreateEvent {
  datetime: any;
  duration: number;
}
const createEvent = async ({ datetime, duration }: CreateEvent) => {
  try {
    return await axios.post(process.env.REACT_APP_HOST_URL + "/events", {
      datetime,
      duration,
    });
  } catch (error) {
    return error;
  }
};

export { getEvents, getFreeAvailableSlot, createEvent };
