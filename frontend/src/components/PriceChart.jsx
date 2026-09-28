import { useEffect, useState } from "react";
import axios from "axios";
import SummaryCards from "./SummaryCards";
import "../Dashboard.css";
import KPICards from "./KPICards";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";

function EventTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div
        style={{
          background: "white",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h4>{data.Event ? "Historical Event" : "Brent Oil Price"}</h4>

        {data.Event && (
          <p>
            <strong>Event:</strong> {data.Event}
          </p>
        )}

        <p>
          <strong>Date:</strong> {data.Date}
        </p>

        <p>
          <strong>Price:</strong> ${data.Price}
        </p>
      </div>
    );
  }

  return null;
}

function CustomLegend() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        margin: "15px 0",
        fontSize: "14px",
      }}
    >
      <div>
        <span
          style={{
            color: "blue",
            fontSize: "25px",
          }}
        >
          ━
        </span>{" "}
        Brent Price
      </div>

      <div>
        <span
          style={{
            color: "red",
            fontSize: "25px",
          }}
        >
          ━
        </span>{" "}
        Bayesian Change Point
      </div>

      <div>
        <span
          style={{
            color: "green",
            fontSize: "25px",
          }}
        >
          ━
        </span>{" "}
        Major Event
      </div>
    </div>
  );
}

function PriceChart() {
  const [prices, setPrices] = useState([]);
  const [changePoint, setChangePoint] = useState(null);
  const [events, setEvents] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  

  useEffect(() => {
    // Get prices
   axios.get(`${import.meta.env.VITE_API_URL}/prices`).then((response) => {

  const importantDates = [
    "1989-05-25",
    "2008-09-15",
    "2014-11-27",
    "2020-03-09",
    "2022-02-24"
  ];


  const sampled = response.data.filter(
    (item, index) =>
      index % 20 === 0 ||
      importantDates.includes(item.Date)
  );


  setPrices(sampled);

});
    

    // Get change point
    axios.get(`${import.meta.env.VITE_API_URL}/change-points`).then((response) => {
      console.log("Change Point:", response.data);

      setChangePoint(response.data[0].Date.substring(0, 10));
    });

        // Get events
    axios.get(`${import.meta.env.VITE_API_URL}/events`).then((response) => {
      console.log("Events:", response.data);

      setEvents(response.data);
    });


  }, []);
  
  const filteredPrices = prices.filter((item) => {
    if (!startDate && !endDate) return true;

    const date = item.Date;

    if (startDate && date < startDate) return false;

    if (endDate && date > endDate) return false;

    return true;
  });

const chartData = filteredPrices.map((price) => {
  const event = events.find((e) => e.Date === price.Date);

  return {
    ...price,
    Event: event ? event.Event : null,
    Description: event ? event.Description : null,
  };
});

const shortEventNames = {
  "OPEC production agreement": "OPEC",
  "Global Financial Crisis": "2008 Crisis",
  "COVID-19 oil price crash": "COVID",
  "Russia-Ukraine conflict": "Ukraine",
  "Asian Financial Crisis": "Asian Crisis",
  "September 11 attacks": "9/11",
  "OPEC production decision": "OPEC Decision",
  "OPEC production cut": "OPEC Cut",
  "Arab Spring": "Arab Spring",
  "Gulf War": "Gulf War",
  "Iraq War": "Iraq War",
};

 return (
   <div className="dashboard">
     <h1 className="dashboard-main-title">
       🛢 Brent Oil Change Point Dashboard
     </h1>

     <p className="dashboard-subtitle">
       Bayesian change point detection and historical Brent oil events
     </p>

     <SummaryCards prices={prices} changePoint={changePoint} events={events} />

     <KPICards />

     <div className="filter-container">
       <label>Start Date:</label>

       <input
         type="date"
         value={startDate}
         onChange={(e) => setStartDate(e.target.value)}
       />

       <label>End Date:</label>

       <input
         type="date"
         value={endDate}
         onChange={(e) => setEndDate(e.target.value)}
       />
     </div>

     <h2 className="dashboard-title">Brent Oil Price History</h2>

     <CustomLegend />

     <div className="chart-container">
       <ResponsiveContainer width="100%" height={400}>
         <LineChart
           data={chartData}
           margin={{
             top: 80,
             right: 30,
             left: 20,
             bottom: 20,
           }}
         >
           <CartesianGrid />

           <XAxis dataKey="Date" />

           <YAxis />

           <Tooltip content={<EventTooltip />} />
           {changePoint && (
             <ReferenceLine
               label="Bayesian Change Point"
               x={changePoint}
               stroke="red"
             />
           )}

           {events.map((event) => (
             <ReferenceLine
               key={event.Date}
               x={event.Date}
               stroke="green"
              strokeDasharray="3 3"
               label={{
                 value: shortEventNames[event.Event] || event.Event,
                 position: "top",
                 angle: -45,
                 fontSize: 10,
               }}
             />
           ))}
           <Line
             name="Brent Price"
             type="monotone"
             dataKey="Price"
             stroke="blue"
             dot={false}
           />
         </LineChart>
       </ResponsiveContainer>
     </div>
   </div>
 );
}
export default PriceChart;
